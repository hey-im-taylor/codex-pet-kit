# Troubleshooting

## The pet is not listed

Fully restart Codex. Open **Settings → Pets → Refresh**, then select Navi. The
installer copies the pack to `~/.codex/pets/navi/`.

## The pet does not animate

macOS Reduce Motion can freeze each pet state on its first frame. Check
**System Settings → Accessibility → Display → Reduce motion**.

## The sound does not play

Run:

```zsh
./test --audio
```

Then fully restart Codex and create a fresh task. Existing tasks can retain an
older configuration snapshot.

## An existing Codex notifier was detected

Codex supports one top-level `notify` command. The installer deliberately does
not overwrite an existing command because it may provide another integration.

The safe solution is a fan-out wrapper that invokes both commands. Do not copy
another person's complete `config.toml`; it may contain private paths or other
settings. Back up your config, identify the existing notifier, and make one
wrapper responsible for forwarding the original arguments to both commands.

## Claude does not play the sound

The optional hook covers Claude Code CLI and the Claude Desktop Code tab when
it runs locally. It does not cover ordinary Claude Chat, Cowork, Cloud, or SSH
execution.

In Claude Code, run `/hooks` and confirm a `Stop` hook is present in user
settings.

## Extra Codex sounds

Some Codex versions do not identify parent and child agent completions in the
notification payload. Multi-agent tasks can therefore produce more than one
sound. The hook deduplicates identical thread and turn identifiers but cannot
reliably infer missing parent-child information.
