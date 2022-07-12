class Paginator(): 
    def paginate(query, query_num, query_size, url):  
        start = (query_num - 1) * query_size
        end = start + query_size
        query_length = query.count()
        query = query.limit(query_size).offset(start).all()
        
        response = {
            "data": query,
            "total": query_length,
            "count": query_size,
            "pagination": {}
        }

        if end >= query_length:
            response["pagination"]["next"] = None

            if query_num > 1:
                response["pagination"]["previous"] = f"{url}?page_num={query_num-1}&page_size={query_size}"
            else:
                response["pagination"]["previous"] = None
        else:
            if query_num > 1:
                response["pagination"]["previous"] = f"{url}?page_num={query_num-1}&page_size={query_size}"        
            else:
                response["pagination"]["previous"] = None

            response["pagination"]["next"] = f"{url}?page_num={query_num+1}&page_size={query_size}"    
        
        return response