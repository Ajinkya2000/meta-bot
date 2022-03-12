const axios = require("axios");

const goalTemplate = (templateData) => {
  const { name, startDate, endDate, goalList } = templateData;
  const startDateFormat = new Date(startDate);
  const endDateFormat = new Date(endDate);

  return `**Goal for the week [${startDateFormat.toLocaleDateString()} - ${endDateFormat.toLocaleDateString()}]**
> By ${name.label}
\`\`\`
${goalList.map((goal, index) => index + 1 + ". " + goal).join("\n")}
\`\`\`
`;
};

export default async function handler(req, res) {
  if (req.method == "POST") {
    const response = await axios.post(process.env.DISCORD_WEBHOOK_URL, {
      content: goalTemplate(req.body),
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

// CREATE A METHOD TO DELETE ALL MESSAGES IN ALL CHANNELS
// CLEAR FORM AFTER ADDING GOAL
