from django.contrib.auth.models import User, Group
from rest_framework import viewsets, permissions, authentication
from .serializers import UserSerializer, GroupSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import action

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permissions_classes = [permissions.IsAuthenticated]
    authentication_classes = [authentication.TokenAuthentication, authentication.SessionAuthentication]
    
    @action(detail=False)
    def current_user(self, request):
        if not request.user.is_authenticated:
            return Response({"message":'Usuário não autenticado'}, status=status.HTTP_401_UNAUTHORIZED) 
        user = User.objects.get(pk=request.user.pk)
        return Response(UserSerializer(user,  context={'request': request}).data)
        
class GroupViewSet(viewsets.ModelViewSet):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes = [permissions.IsAuthenticated]