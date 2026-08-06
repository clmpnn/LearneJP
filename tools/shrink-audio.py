#!/usr/bin/env python3
"""Re-encode the listening audio to a lower bitrate.

Read this before running it. The clips are variable bitrate and already average
about 39 kbps, so 231 MB really is what 13.7 hours of speech costs. Re-encoding
at 48 kbps saves 2%. The only meaningful savings need a bitrate low enough to
hear — 32 kbps saves 43 MB, 24 kbps saves 90 MB — and this material is listening
practice, where straining to catch a particle is the whole exercise.

So this is here as a measured option, not a recommendation. Default target is
32 kbps mono; it reports before it touches anything.

    python3 tools/shrink-audio.py                  # report only
    python3 tools/shrink-audio.py --apply          # re-encode
    python3 tools/shrink-audio.py --kbps 24 --apply
"""
import os
import subprocess
import sys
import tempfile
from glob import glob

def probe(path):
    """Average bitrate in kbps.

    Read with ffprobe rather than from the first frame header: these files are
    variable bitrate, so the header reports the opening frame and can be five
    times the true average. Trusting it is how you conclude the audio needs
    shrinking when it does not.
    """
    result = subprocess.run(
        ['ffprobe', '-v', 'quiet', '-show_entries', 'format=duration', '-of', 'csv=p=0', path],
        capture_output=True, text=True)
    try:
        duration = float(result.stdout.strip())
    except ValueError:
        return None
    if duration <= 0:
        return None
    return os.path.getsize(path) * 8 / duration / 1000


def main():
    apply_changes = '--apply' in sys.argv
    target = 32
    if '--kbps' in sys.argv:
        target = int(sys.argv[sys.argv.index('--kbps') + 1])
    files = sorted(glob('audio/*/*.mp3'))
    if not files:
        sys.exit('No audio found. Run this from the repository root.')

    before = after = 0
    converted = skipped = failed = 0

    for path in files:
        size = os.path.getsize(path)
        before += size

        kbps = probe(path)
        if kbps is None or kbps <= target * 1.1:
            after += size
            skipped += 1
            continue

        handle, temp = tempfile.mkstemp(suffix='.mp3')
        os.close(handle)
        result = subprocess.run(
            ['ffmpeg', '-y', '-loglevel', 'error', '-i', path,
             '-codec:a', 'libmp3lame', '-b:a', f'{target}k', '-ac', '1', temp],
            capture_output=True)

        if result.returncode != 0 or not os.path.getsize(temp):
            os.unlink(temp)
            after += size
            failed += 1
            print(f'  could not re-encode {path}')
            continue

        new_size = os.path.getsize(temp)
        if new_size >= size:
            os.unlink(temp)
            after += size
            skipped += 1
            continue

        if apply_changes:
            os.replace(temp, path)
        else:
            os.unlink(temp)
        after += new_size
        converted += 1

    mb = 1048576
    print(f'\ntarget {target} kbps mono')
    print(f'{len(files)} files: {converted} re-encoded, {skipped} left alone, {failed} failed')
    print(f'{before / mb:.0f} MB  →  {after / mb:.0f} MB   '
          f'({(before - after) / mb:.0f} MB saved, {(1 - after / before) * 100:.0f}%)')
    if not apply_changes:
        print('\nNothing was changed. Re-run with --apply to write the files.')


if __name__ == '__main__':
    main()
