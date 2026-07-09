{
  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs?ref=nixos-26.05";
    flake-parts.url = "github:hercules-ci/flake-parts";
    nix-capsule.url = "gitlab:codnixus/nix-capsule?ref=v0.8.0";
  };

  outputs =
    { flake-parts, ... }@inputs:
    flake-parts.lib.mkFlake { inherit inputs; } {
      perSystem =
        {
          system,
          ...
        }:
        let
          pkgs = import inputs.nixpkgs {
            inherit system;
            overlays = [
              inputs.nix-capsule.overlays.default
            ];
          };
          capsule-lib = inputs.nix-capsule.lib { inherit pkgs; };
        in
        {
          apps.default = capsule-lib.app;
          devShells = {
            default = capsule-lib.mkShell {
              image = "mcr.microsoft.com/playwright:v1.61.0-noble";
              devShell = "container";
              socketPath = "/tmp/personal-website/ncap-socket";
              containerName = "personal-website";
              extraOptions = [
                "-e"
                "PNPM_HOME"
                "-p=3000:3000"
                "--pid=host"
                "-v=ms-playwright:/ms-playwright"
              ];
              wrappers = [
                "node"
                "pnpm"
                "vscode-css-language-server"
                {
                  name = "astro-ls";
                  value = "node_modules/.bin/astro-ls";
                }
                {
                  name = "typescript-language-server";
                  value = "node_modules/.bin/typescript-language-server";
                }
                {
                  name = "prettier";
                  value = "pnpm exec prettier";
                }
                {
                  name = "playwright-cli";
                  value = "pnpm exec playwright-cli";
                }
              ];
              preShellHook = ''
                export PNPM_HOME=''${PNPM_HOME:-$HOME/.local/share/pnpm}
                mkdir -p "$PNPM_HOME"
              '';
            };

            container =
              pkgs.mkShellNoCC {
                packages = with pkgs; [
                  nodejs
                  pnpm
                  vscode-css-languageserver
                ];
              };
          };
        };

      systems = [
        "x86_64-linux"
        "aarch64-linux"
        "x86_64-darwin"
        "aarch64-darwin"
      ];
    };
}

