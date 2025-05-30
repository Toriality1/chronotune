export class MissingTokenError extends Error {
  constructor() {
    super("Missing token");
    this.name = "MissingTokenError";
  }
}

export class InvalidTokenError extends Error {
  constructor() {
    super("Invalid token");
    this.name = "InvalidTokenError";
  }
}

export class FailedToCreateTokenError extends Error {
  constructor() {
    super("Failed to create token");
    this.name = "FailedToCreateTokenError";
  }
}

export class MissingEnvironmentVariablesError extends Error {
  constructor() {
    super("Missing environment variables");
    this.name = "MissingEnvironmentVariablesError";
  }
}
