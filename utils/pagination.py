import models
import math

class Paginator(): 
    def paginate(self, query, query_num, query_size, url, session):  
        start = (query_num - 1) * query_size
        end = start + query_size
        query_length = query.count()
        query = query.limit(query_size).offset(start).all()

        response = {
            "data": self.id_to_username(session, query),
            "total": query_length,
            "count": query_size,
            "pages": math.ceil(query_length / query_size),
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

    def get_user_object(self, session, uid):
        user_query = session.query(models.User).get(uid)
        return user_query

    def id_to_username(self, session, query):
        users = {}
        upd_query = {}

        if hasattr(query, '__iter__'):
            for post in query:
                id = post.owner_id
                postid = post.id

                if id not in users:
                    user_obj = self.get_user_object(session, id)
                    users[f'{id}'] = user_obj.username
                
                upd_query[f'{postid}'] = {}
                upd_query[f'{postid}']['username'] = users[f'{id}']
                upd_query[f'{postid}']['id'] = postid
                upd_query[f'{postid}']['text'] = post.text
        else:        
            id = query.owner_id
            user_obj = self.get_user_object(session, id)
            upd_query['username'] = user_obj.username
            upd_query['id'] = query.id
            upd_query['text'] = query.text

        return upd_query     