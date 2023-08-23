# BotWhatsappNode
Bot Whatsapp Landbot NodeJs


# API DOCUMENTATION
/api/v1/docs

# Docker Instruction

# image
docker build . -t intestinolimpio
# view images
docker images

# conteiner
# (para correr con ubuntu)
docker run -d --name intestinolimpio --restart unless-stopped --network host intestinolimpio

# (para correr con windows)
docker run -d --name intestinolimpio --restart unless-stopped -p 3000:3000 intestinolimpio

# view conteiners
docker ps