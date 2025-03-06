import { createClient } from '@sanity/client';

const sanityClient = createClient(
            {"apiVersion":"2021-03-25","projectId":"9ud96vcw","dataset":"production","useCdn":false,"stega":{"enabled":false,"studioUrl":"\u002Fstudio"}}
          );

globalThis.sanityClient = sanityClient;

export { sanityClient as s };
