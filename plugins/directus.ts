import { createDirectus, rest, readItem, readItems, staticToken } from '@directus/sdk';

export default defineNuxtPlugin(() => {
    const config = useRuntimeConfig()


    const directus = createDirectus(config.public.directusAPI)
        .with(staticToken(config.public.directusToken))
        .with(rest());

    return {
        provide: { directus, readItem, readItems },
    };
});