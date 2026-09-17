# Creating a pet pack

A pack contains:

```text
my-pet/
├── pet.json
└── spritesheet.webp
```

For the currently supported v2 format, `spritesheet.webp` must be a transparent
1536×2288 WebP arranged as 8 columns and 11 rows.

Example metadata:

```json
{
  "id": "my-pet",
  "displayName": "My Pet",
  "description": "A short description",
  "spriteVersionNumber": 2,
  "spritesheetPath": "spritesheet.webp"
}
```

Use a lowercase identifier containing only letters, numbers, and hyphens. Run:

```zsh
./scripts/validate-pack /path/to/my-pet
```

See [animation-map.md](animation-map.md) for the required row order. Custom-pet
support is not a stable public Codex API, so validate again after app updates.
