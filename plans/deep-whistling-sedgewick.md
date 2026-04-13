# 计划：重新构建兼容绿联 NAS 的 Docker 镜像

## Context

用户上传 harmonica-music.tar.gz 到绿联 NAS DXP4800 Plus (Intel x86_64) 时遇到 "exec format error" 错误。怀疑是 Alpine 基础镜像的兼容性问题，尝试改用标准的 node:20 镜像。

## 待执行

1. 修改 Dockerfile: `node:20-alpine` → `node:20`
2. 重新构建镜像（不带 --platform 参数）
3. 打包上传

## 验证
docker build 成功即可