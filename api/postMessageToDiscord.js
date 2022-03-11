const axios = require("axios");

const goalTemplate = `**Goal for the week [21st March, 2022 - 28th March, 2022]**
> By Ajinkya
\`\`\`
1. Do this.
2. Do that.
3. Then do nothing.
\`\`\`
`;

export default async function handler(req, res) {
  if (req.method == "POST") {
    const response = await axios.post(process.env.DISCORD_WEBHOOK_URL, {
      content: goalTemplate,
    });

    const checkSuccessfulStatusCode = parseInt(response.status) / 100;

    if (checkSuccessfulStatusCode >= 3) {
      return res.status(500).json({ msg: "Server Error", type: "danger" });
    }

    return res
      .status(201)
      .json({ msg: "Yippie!!, Goal Successfully Added", type: "success" });
  } else {
    return res.status(400).json({ msg: "Method not Fount" });
  }
}
