

import { useProducts } from '../../utils/directus';

export default defineCachedEventHandler(async (event) => {
  //const { getProductByExtertnalProductId, getProducts } = useProducts();
    const queries = getQuery(event)    
    if(!queries?.pid) return null

    const data = await useProducts().getProductByPID(queries.pid) || null
    console.log(data)
    return data
  }, {
    group: 'icommerce',
    name: 'product',    
    //maxAge: 360 * 12,  //minimun time,
    //staleMaxAge: -1, // sent to the client while the cache updates in the background.
    //swr: false
    getKey: (event) =>  `${getQuery(event)?.pid}`
  });
