"""Export corresponding source without credentials, caches or game records."""
import os
from pathlib import Path
from zipfile import ZipFile, ZIP_DEFLATED

root = Path(__file__).resolve().parents[1]
excluded = {".git", ".vercel", "node_modules", "static", "static-vercel", "out", "build", "coverage", "data", "artifacts", ".husky", ".vscode", "__pycache__"}
target = root / os.environ.get("OUTPUT_DIR", "static") / "source.zip"
target.parent.mkdir(exist_ok=True)
with ZipFile(target, "w", ZIP_DEFLATED) as archive:
    for directory, dirs, files in os.walk(root, followlinks=False):
        base = Path(directory)
        dirs[:] = sorted(name for name in dirs if name not in excluded and not (base / name).is_symlink() and (base / name).resolve() != target.parent.resolve())
        for name in sorted(files):
            path = base / name
            if path.is_symlink() or name.startswith(".env") or path.suffix in {".log", ".pem", ".key"}:
                continue
            archive.write(path, Path("Frontwars2") / path.relative_to(root))
print(f"Source export: {target.name} ({target.stat().st_size} bytes)")
