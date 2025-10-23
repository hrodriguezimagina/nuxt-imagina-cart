import { createDirectus, rest,readItem,readItems, staticToken } from '@directus/sdk';


export const useProducts = () => {  
  

  const directus = createDirectus(process.env.DIRECTUS_API)
        .with(staticToken(process.env.DIRECTUS_TOKEN))
        .with(rest());

  
  const getProducts = async () => {
    return await directus.request(readItems('products',  {
      fields: ['*',  
        { 
          categories: ['*'],
          frecuencies: ['*'] 
        }
      ]}
    ));
  };
  
  
  const getProductById = async (id) => {
    return await directus.request(readItem('products', id));
  };

  const getProductByPID = async (pid) => {
    const [item] = await directus.request(
      readItems('products', { 
          filter: { 'pid': { _eq: pid  }},
          fields: [
            '*', 
            'categories.*', 
            'frecuencies.price', 'frecuencies.status', 'frecuencies.frecuency_id.*'
          ]
      })
    );
    return item;
  };

  return { getProductById, getProductByPID, getProducts };
};

