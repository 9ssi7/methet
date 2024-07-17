
workers := apps/worker.auth apps/worker.praise apps/worker.profile
apps := apps/site $(workers)

install:
	@for app in $(apps); do \
		$(MAKE) -C $$app install; \
	done

copy-wrangler:
	@for app in $(workers); do \
		$(MAKE) -C $$app copy-wrangler; \
	done