runmysql: 
	docker run -p 3306:3306 --name mysql -e MYSQL_ROOT_PASSWORD=secret -d mysql

startmysql: 
	docker start mysql

stopmysql: 
	docker stop mysql

createdb:
	docker exec mysql mysql -u root -psecret -e "CREATE DATABASE ecommerce"

dropdb:
	docker exec mysql mysql -u root -psecret -e "SET FOREIGN_KEY_CHECKS=0; DROP DATABASE IF EXISTS ecommerce; SET FOREIGN_KEY_CHECKS=1;"

seed:
	cd server && node seeder

startserver: 
	cd server && npm start
startclient:
	cd client && pnpm start

.PHONY: runmysql startmysql stopmysql seed dropdb startserver startclient