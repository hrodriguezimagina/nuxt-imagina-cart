import { createDirectus, rest,readItem,readItems, staticToken } from '@directus/sdk';

const initDirectus = () => {
  return createDirectus(process.env.DIRECTUS_API)
        .with(staticToken(process.env.DIRECTUS_TOKEN))
        .with(rest());        
}


export const useProducts = () => { 
  const directus = initDirectus() 
  
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
          filter: { 
            'pid': { _eq: pid  },
            'status': { _eq: 'published'}
          },
          fields: [
            '*', 
            'category.*', 
            'frecuencies.*', 'frecuencies.frecuency_id.*'
          ]
      })
    );

    // map the relastionship and sorted them
    if(item.frecuencies.length){
      item.frecuencies = item.frecuencies.map(x => {
        return {
          price: x?.price || 0, 
          ...x['frecuency_id'] //map relation
        }
      }).sort((a, b) => a.duration - b.duration )
    }

    return item;
  };

  return { getProductById, getProductByPID, getProducts };
};

