const properties = {
  VITE_GRAPHQL_API: "http://example.com",
};

export const useEnv = (): typeof properties => {
  const _test = import.meta.env;

  for (const key in properties) {
    if (!_test[key]) {
      throw new Error(`Property ${key} not found in .env.
      Please add it to .env file or set it as environment variable.
      Default value: ${properties[key as keyof typeof properties]}`);
    }
  }

  const _env = Object.fromEntries(
    Object.entries(properties)
      .filter(([key]) => _test[key] !== undefined)
      .map(([key]) => [key, _test[key]])
  );

  return _env as typeof properties;
};
