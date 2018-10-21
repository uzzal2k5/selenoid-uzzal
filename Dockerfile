FROM node:8.12.0
WORKDIR /app
COPY .  .

# INSTALL ALL REQUIRE PACKAGES
RUN npm install

# CONFIG STANDARD ERROR LOG
RUN ln -sf /dev/stdout /var/log/access.log \
	&& ln -sf /dev/stderr /var/log/error.log
