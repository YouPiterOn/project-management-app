export function toURLSearchParams(data: Record<string, unknown>): URLSearchParams {
  const entries = Object.entries(data).reduce<[string, string][]>((acc, [key, value]) => {
    if (value !== undefined && value !== null) {
      acc.push([key, String(value)]);
    }
    return acc;
  }, []);

  return new URLSearchParams(entries);
}
