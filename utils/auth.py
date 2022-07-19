import jwt
from fastapi import HTTPException, Security
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from passlib.context import CryptContext
from datetime import datetime, timedelta
class AuthHandler(): 
    bearer = HTTPBearer()
    context = CryptContext(schemes=['bcrypt'], deprecated='auto')
    key = 'secret'

    def generate_hash(self, password):
        return self.context.hash(password)

    def verify(self, password, hashed_password):
        return self.context.verify(password, hashed_password)

    def encode_token(self, args):
        object = {
            'exp': datetime.utcnow() + args['time'],
            'iat': datetime.utcnow(),
            'scope': args['scope'],
            'id': args['id']
        }    
        return jwt.encode(object, self.key, algorithm='HS256')

    def decode_access_token(self, token):
        try: 
            object = jwt.decode(token, self.key, algorithms=['HS256'])
            if (object['scope'] == 'AC'):
                return object['id']
            raise HTTPException(status_code=401, detail='INVALID SCOPE')    
        except jwt.ExpiredSignatureError:
            raise HTTPException(status_code=401, detail='TOKEN EXPIRED')
        except jwt.InvalidTokenError as e:
            raise HTTPException(status_code=401, detail='INVALID TOKEN')

    def decode_refresh_token(self, token):
        try: 
            object = jwt.decode(token, self.key, algorithms=['HS256'])
            if (object['scope'] == 'RF'):
                id = object['id']
                tokens = self.generate_tokens(id)
                return {'status': 200, 'access': tokens['ac'], 'refresh': tokens['rf']}
            raise HTTPException(status_code=401, detail='INVALID SCOPE')     
        except jwt.ExpiredSignatureError:
            raise HTTPException(status_code=401, detail='TOKEN EXPIRED')
        except jwt.InvalidTokenError as e:
            raise HTTPException(status_code=401, detail='INVALID TOKEN')        

    def generate_tokens(self, id):
        access = self.encode_token({'id': id, 
        'time': timedelta(minutes=30), 
        'scope': 'AC'})
        refresh = self.encode_token({'id': id, 
        'time': timedelta(hours=10), 
        'scope': 'RF'})  
        return {'ac': access, 'rf': refresh}

    def auth_wrapper(self, auth: HTTPAuthorizationCredentials = Security(bearer)):
        return self.decode_access_token(auth.credentials)   

    def token_wrapper(self, auth: HTTPAuthorizationCredentials = Security(bearer)):
        return auth.credentials        