from jwt import decode
from myproject.settings import ENVIRON

class JWTMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        whitelist = ['/login/', '/signup/']

        if not request.path in whitelist:
            jwt_cookie = request.COOKIES.get('token')
            if jwt_cookie:
                try:
                    jwt_token = decode(jwt_cookie, ENVIRON['SECRET_KEY'], algorithms=ENVIRON['SECRET_ALGORITHM'])
                    request.jwt_token = jwt_token
                except Exception as e:
                    pass

        response = self.get_response(request)
        return response
