import { useProducts } from '../../utils/directus';

export default defineCachedEventHandler(async (event) => {
    const queries = getQuery(event)    
    if(!queries?.pid) return null

    const data = await useProducts().getProductByPID(queries.pid) || null
    
    return data
  }, {
    group: 'icommerce',
    name: 'product',    
    maxAge: 2,  //minimun time,
    //staleMaxAge: -1, // sent to the client while the cache updates in the background.
    //swr: false
    getKey: (event) =>  `${getQuery(event)?.pid}`
  });
