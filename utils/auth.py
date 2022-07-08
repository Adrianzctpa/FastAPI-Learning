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

    def encode_token(self, user_id):
        object = {
            'exp': datetime.utcnow() + timedelta(days=0, minutes=10),
            'iat': datetime.utcnow(),
            'id': user_id
        }    
        return jwt.encode(object, self.key, algorithm='HS256')

    def decode_token(self, token):
        try: 
            object = jwt.decode(token, self.key, algorithms=['HS256'])
            return object['id']
        except jwt.ExpiredSignatureError:
            raise HTTPException(status_code=401, detail='TOKEN EXPIRED')
        except jwt.InvalidTokenError as e:
            raise HTTPException(status_code=401, detail='INVALID TOKEN')

    def auth_wrapper(self, auth: HTTPAuthorizationCredentials = Security(bearer)):
        return self.decode_token(auth.credentials)       