export interface RuntimeConfig {
    apiBaseUrl: string;
}

let runtimeConfig: RuntimeConfig = {
    apiBaseUrl: '/api',
};

export function setRuntimeConfig(config: RuntimeConfig): void {
    runtimeConfig = config;
}

export function getRuntimeConfig(): RuntimeConfig {
    return runtimeConfig;
}
