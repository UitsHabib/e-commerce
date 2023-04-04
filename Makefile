seed:
	cd server && node seeder

startserver: 
	cd server && npm start

.PHONY: seed