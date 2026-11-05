{
  pkgs,
  lib,
  config,
  ...
}:
{
  # devenv.sh/languages/
  languages.javascript = {
    enable = true;
    pnpm.enable = true;
  };

  languages.deno.enable = true;

  # See full reference at https://devenv.sh/reference/options/
}
