#下载node,设置镜像
FROM node


#拷贝所有文件到容器内的app文件夹中
COPY . /app

#打开容器app文件夹
WORKDIR /app
#运行 npm install -g cnpm --registry=https://registry.npm.taobao.org 命令
RUN npm install -g cnpm --registry=https://registry.npm.taobao.org
RUN cnpm install -g yarn 
RUN yarn
# 使用node镜像
USER node

# 运行命令
CMD npm run dev