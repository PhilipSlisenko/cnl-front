export function CNLLogo() {
  return (
    <div className="h-16 flex shrink-0 items-center text-xl font-bold text-primary">
      C<span className="tracking-wide">NL</span>{" "}
    </div>
  );
}
export function CNLConsoleLogo() {
  return (
    <div
      className="flex  shrink-0 items-center text-xl font-bold text-accent"
      style={{ color: "--var(accent)" }}
    >
      C<span className="tracking-wide">NL</span>{" "}
      <span className="ml-1 text-lg font-light tracking-tight">Console</span>
    </div>
  );
}
