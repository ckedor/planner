from pathlib import Path
from decouple import config
import django_heroku

BASE_DIR = Path(__file__).resolve().parent.parent
SECRET_KEY = config("SECRET_KEY")
DEBUG = config("DEBUG", default=False, cast=bool)
ALLOWED_HOSTS = ['127.0.0.1', 'localhost', 'https://multi-planner-api.herokuapp.com/']

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django_filters',
    'rest_framework.authtoken',
    'rest_framework',
    'corsheaders',
    'financas'
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'project.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'project.wsgi.application'

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'multiplanner',
        'USER': 'postgres',
        'PASSWORD': 'roots',
        'HOST': '127.0.0.1',
        'PORT': '5432',
    }
}

# db_from_env = dj_database_url.config(conn_max_age=600)
# DATABASES['default'].update(db_from_env)

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


LANGUAGE_CODE = 'pt-br'
TIME_ZONE = 'America/Sao_Paulo'
USE_I18N = True
USE_TZ = True

STATIC_URL = 'static/'
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

STATIC_ROOT = 'static/'

CORS_ORIGIN_WHITELIST = [
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    'https://multi-planner-front.herokuapp.com/'
]

DEFAULT_PERMISSION_CLASSES= ['rest_framework.permissions.IsAuthenticated']
if DEBUG:
    DEFAULT_PERMISSION_CLASSES = []
    
REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': DEFAULT_PERMISSION_CLASSES,
    'DEFAULT_FILTER_BACKENDS':['django_filters.rest_framework.DjangoFilterBackend']
}

django_heroku.settings(locals())