# Quickli code challenge stub

Here is a working code base we've prepared for you. You should be able to stick in some environment variables and deploy it to Vercel to get it going in 5-10 minutes.

## What's next?

You should sus it out before you start the challenge. We've kept the project as simple as possible so it's easy to extend.

Let us know when you're ready to start the challenge and we'll email it to you at the start of the 3 hour block.

## Key technologies

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app` and is composed of the following:

- [Next.js](https://nextjs.org)
- [NextAuth.js](https://next-auth.js.org) (I fiddled about to get a bodgy version of credential auth working so that you don't need to worry about hooking up any oauth providers)
- [Prisma](https://prisma.io)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)

We don't actually use t3 at Quickli but there is a lot of overlap conceptually so I figure it's a decent intro to how our app works.

## Learn More

To learn more about the [T3 Stack](https://create.t3.gg/), take a look at the following resources:

- [Documentation](https://create.t3.gg/)
- [Learn the T3 Stack](https://create.t3.gg/en/faq#what-learning-resources-are-currently-available) — Check out these awesome tutorials

You can check out the [create-t3-app GitHub repository](https://github.com/t3-oss/create-t3-app) — your feedback and contributions are welcome!

## How do I deploy this?

1. Push this code to a fresh repo in github (5 mins)
2. Create Vercel account (5 mins)
3. Create free mongo atlas account and db (5 mins)
4. Deploy code to Vercel
5. Set environment variables `DATABASE_URL` (get this from Atlas) and `AUTH_SECRET` (can be anything)
   - (same as what is in your local `.env` file)
6. Redeploy after changing any env

I'm pretty familiar with Vercel, Mongo and github, so this whole process took me about 15 minutes to get deployed to a production instance and connected to a database.
It may take a bit longer but there shouldn't be any major blockers.

Check out a deployed version here: (https://quickli-code-chal-stub.vercel.app/).

Here is a guide if you want one (https://create.t3.gg/en/deployment/vercel).

## Other tidbits

- run `db:force-push` after updating the prisma schema (we don't need to worry too much about migrations because it's nosql)
- Auth us basically textbook NextAuth with a few tweaks to make it work for username/password auth
