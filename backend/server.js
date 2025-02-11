const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

function generateEmailTemplate(type, data) {
    const logoUrl = 'https://www.parkoursc.com/wp-content/uploads/2022/03/ParkourSC-Logo_Horizontal.png';
    const commonTemplate = `
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>ParkourSC Release Notification</title>
      <style type="text/css">
        body, p { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
        .content-area { background-color: #f0f0f0; }
        .header { background-color: #012160; color: white; padding: 20px; text-align: center; }
        .logo { max-width: 200px; height: auto; }
        .section { position: relative; padding-left: 60px; margin-bottom: 20px; min-height: 50px; }
        .icon { position: absolute; left: 0; top: 0; width: 50px; height: 50px; text-align: center; line-height: 50px; color: white; font-size: 24px; }
        .check-icon { background-color: #012160; }
        .exclamation-icon { background-color: #3366cc; }
        .question-icon { background-color: #ffa500; }
        h2 { color: #012160; margin-top: 0; }
        ul { padding-left: 20px; }
      </style>
    </head>
    <body style="margin: 0; padding: 0; background-color: #f0f0f0;">
      <table border="0" cellpadding="0" cellspacing="0" width="100%">
        <tr>
          <td>
            <table align="center" border="0" cellpadding="0" cellspacing="0" width="810" style="border-collapse: collapse; background-color: #f0f0f0;">
              <tr>
                <td class="header">
                  <h1 style="margin: 0; color: white;">Release Train ${data.releaseVersion}</h1>
                  <p style="margin: 10px 0 0; color: white;">Now available in your ${type.includes('uat') ? 'Preview' : 'Production'} Environment!</p>
                </td>
              </tr>
              <tr>
                <td align="center" style="padding: 20px;">
                  <img src="${logoUrl}" alt="ParkourSC Logo" class="logo" />
                </td>
              </tr>
              <tr>
                <td class="content-area" style="padding: 20px;">
                  ${getContentByType(type, data)}
                </td>
              </tr>
              <tr>
                <td style="padding: 20px; font-size: 12px;">
                  <p>Please feel free to contact the Customer Success(CS) Team with any questions.</p>
                  <p>Thank you for your partnership!</p>
                  <p>The ParkourSC Customer Success Team</p>
                  <p>© 2024 ParkourSC. All Rights Reserved.</p>
                  <p>STRICTLY CONFIDENTIAL. NOT FOR FURTHER DISTRIBUTION.</p>
                  <table border="0" cellpadding="0" cellspacing="0">
                    <tr>
                      <td>
                        <a href="mailto:appsupport@parkoursc.com"><img src="https://cdn.tools.unlayer.com/social/icons/circle/email.png" alt="Email" width="32" height="32" /></a>
                      </td>
                      <td style="width: 10px;"></td>
                      <td>
                        <a href="https://www.linkedin.com/company/parkoursc"><img src="https://cdn.tools.unlayer.com/social/icons/circle/linkedin.png" alt="LinkedIn" width="32" height="32" /></a>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;

    return commonTemplate;
}

function getContentByType(type, data) {
    const commonSection = (icon, title, content) => `
    <div class="section">
      <div class="icon ${icon}">${icon === 'check-icon' ? '✓' : icon === 'exclamation-icon' ? '!' : '?'}</div>
      <h2>${title}</h2>
      ${content}
    </div>
  `;

    switch (type) {
        case '7_days_before_uat':
            return `
        ${commonSection('check-icon', `We're excited to introduce ${data.releaseVersion}`, `
          <p>The latest release will be deployed to your <strong>Preview</strong> environment!</p>
          <p><strong>Deployment Date:</strong> ${data.deploymentDate}</p>
          <p><strong>Deployment Time:</strong> ${data.deploymentTime}</p>
          <p>Please use this time to prepare for the upcoming release. The Preview environment will be available for you to explore the new features and functionalities after the deployment.</p>
        `)}
        ${commonSection('question-icon', "What's New?", `
          ${data.releaseNotes}
        `)}
        <p style="text-align: center;"><a href="${data.pdfLink}">PDF: The Latest ParkourSC Release Notes</a></p>
      `;
        case 'uat_complete':
            return `
        ${commonSection('check-icon', `We're excited to introduce ${data.releaseVersion}`, `
          <p>The latest release was deployed and available in your <strong>Preview</strong> environment!</p>
          <p>Please use the Preview period to explore the Release in the Preview environment, ask questions, and better understand the changes. As always, your current functionality will remain the same, and you will have time to adapt it to your business process. The new functionality will be there for you to use when you are ready!</p>
        `)}
        ${commonSection('exclamation-icon', 'Upcoming Production Deployment', `
          <p>${data.productionDeploymentDate}</p>
          <p>Change Window: ${data.changeWindowStart} to ${data.changeWindowEnd}</p>
          <p>Please note, during the maintenance window, the <strong>Production</strong> environment will be inaccessible, and all API calls should be paused. All operations can be resumed immediately after the maintenance window.</p>
        `)}
        ${commonSection('question-icon', "What's New?", `
          ${data.releaseNotes}
        `)}
        <p style="text-align: center;"><a href="${data.pdfLink}">PDF: The Latest ParkourSC Release Notes</a></p>
      `;
        case 'prod_begins':
            return `
        ${commonSection('exclamation-icon', 'Production Deployment Begins', `
          <p>We are excited to announce that the deployment of ${data.releaseVersion} to the <strong>Production</strong> environment has begun.</p>
          <p><strong>Deployment Date:</strong> ${data.productionDeploymentDate}</p>
          <p><strong>Change Window:</strong> ${data.changeWindowStart} to ${data.changeWindowEnd}</p>
          <p>Please note that during this maintenance window, the Production environment will be inaccessible, and all API calls should be paused. All operations can be resumed immediately after the maintenance window.</p>
        `)}
        ${commonSection('question-icon', "What's New?", `
          ${data.releaseNotes}
        `)}
        <p style="text-align: center;"><a href="${data.pdfLink}">PDF: The Latest ParkourSC Release Notes</a></p>
      `;
        case 'prod_complete':
            return `
        ${commonSection('check-icon', 'Production Deployment Complete', `
          <p>We are pleased to announce that ${data.releaseVersion} has been successfully deployed to the <strong>Production</strong> environment.</p>
          <p>All systems are operational, and you can now take advantage of the new features and improvements.</p>
        `)}
        ${commonSection('question-icon', "What's New?", `
          ${data.releaseNotes}
        `)}
        <p style="text-align: center;"><a href="${data.pdfLink}">PDF: The Latest ParkourSC Release Notes</a></p>
      `;
        default:
            return '<p>Invalid email type</p>';
    }
}

app.post('/generate-email', (req, res) => {
    const { type, data } = req.body;
    const emailHtml = generateEmailTemplate(type, data);
    res.json({ html: emailHtml });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
