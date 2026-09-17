ObjC.import("Foundation");

function readUtf8(path) {
  const data = $.NSData.dataWithContentsOfFile(path);
  if (!data) return "{}";
  return ObjC.unwrap($.NSString.alloc.initWithDataEncoding(data, $.NSUTF8StringEncoding));
}

function writeUtf8(path, content) {
  const string = $.NSString.stringWithString(content);
  const error = Ref();
  const ok = string.writeToFileAtomicallyEncodingError(
    path,
    true,
    $.NSUTF8StringEncoding,
    error,
  );
  if (!ok) throw new Error(`Unable to write ${path}`);
}

function run(argv) {
  const [mode, settingsPath, hookPath] = argv;
  if (!mode || !settingsPath || !hookPath) {
    throw new Error("Usage: update-claude-hook.js add|remove SETTINGS HOOK");
  }

  const settings = JSON.parse(readUtf8(settingsPath));
  settings.hooks ||= {};
  settings.hooks.Stop ||= [];

  const isPetKitGroup = (group) =>
    Array.isArray(group?.hooks) &&
    group.hooks.some(
      (hook) =>
        hook?.type === "command" &&
        hook?.command === hookPath &&
        Array.isArray(hook?.args) &&
        hook.args[0] === "claude",
    );

  settings.hooks.Stop = settings.hooks.Stop.filter(
    (group) => !isPetKitGroup(group),
  );

  if (mode === "add") {
    settings.hooks.Stop.push({
      hooks: [
        {
          type: "command",
          command: hookPath,
          args: ["claude"],
          async: true,
          timeout: 5,
        },
      ],
    });
  } else if (mode !== "remove") {
    throw new Error(`Unknown mode: ${mode}`);
  }

  if (settings.hooks.Stop.length === 0) delete settings.hooks.Stop;
  if (Object.keys(settings.hooks).length === 0) delete settings.hooks;

  writeUtf8(settingsPath, `${JSON.stringify(settings, null, 2)}\n`);
  return mode;
}
