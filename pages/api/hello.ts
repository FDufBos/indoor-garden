// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

/**
 * A test api function
 *
 * @param req - The Request
 * @param res - The Response
 */
export default function handler(req, res): void {
  res.status(200).json({ name: "John Doe" });
}
