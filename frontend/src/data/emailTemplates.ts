import { EmailTemplate } from '../types/email';

const getBaseEmailTemplate = (content: string) => `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="x-apple-disable-message-reformatting">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title></title>
    <style>
        @media only screen and (min-width: 620px) {
            .u-row {
                width: 600px !important;
            }
            .u-row .u-col {
                vertical-align: top;
            }
            .u-row .u-col-20p5 {
                width: 123px !important;
            }
            .u-row .u-col-79p5 {
                width: 477px !important;
            }
            .u-row .u-col-100 {
                width: 600px !important;
            }
        }

        @media only screen and (max-width: 620px) {
            .u-row-container {
                max-width: 100% !important;
                padding-left: 0px !important;
                padding-right: 0px !important;
            }
            .u-row {
                width: 100% !important;
            }
            .u-row .u-col {
                min-width: 320px !important;
                max-width: 100% !important;
                display: block !important;
            }
            .u-row .u-col > div {
                margin: 0 auto;
            }
            .no-stack .u-col {
                min-width: 0 !important;
                display: table-cell !important;
            }
            .no-stack .u-col-20p5 {
                width: 20.5% !important;
            }
            .no-stack .u-col-79p5 {
                width: 79.5% !important;
            }
            .no-stack .u-col-100 {
                width: 100% !important;
            }
        }

        body {
            margin: 0;
            padding: 0;
            font-family: 'Montserrat', Arial, sans-serif;
            background-color: #f9f9f9;
        }

        .header {
            background-color: #012160;
            color: white;
            padding: 20px;
            text-align: center;
        }

        .header h1 {
            font-size: 24px;
            margin: 0;
            font-weight: 400;
        }

        .header h2 {
            font-size: 14px;
            margin: 10px 0 0;
            font-weight: 400;
        }

        .logo-section {
            background-color: #efefef;
            padding: 20px;
            text-align: center;
        }

        .logo-section img {
            max-width: 232px;
            width: 40%;
            height: auto;
        }

        .content {
            background-color: white;
            padding: 20px;
            margin: 0 auto;
            max-width: 600px;
        }

        .section {
            display: flex;
            align-items: flex-start;
            margin-bottom: 30px;
            padding: 20px;
            background-color: #f8f9fa;
            border-radius: 8px;
        }

        .section-icon {
            flex-shrink: 0;
            width: 40px;
            height: 40px;
            margin-right: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            border-radius: 50%;
            color: white;
        }

        .section-icon.checkmark {
            background-color: #012160;
        }

        .section-icon.exclamation {
            background-color: #1564f4;
        }

        .section-icon.question {
            background-color: #ffbb01;
        }

        .section-content {
            flex-grow: 1;
        }

        .section-content h3 {
            color: #012160;
            font-size: 20px;
            margin: 0 0 15px;
            font-weight: 700;
        }

        .section-content h4 {
            color: #1564f4;
            font-size: 16px;
            margin: 15px 0 10px;
        }

        .details {
            background-color: #f8f9fa;
            padding: 20px;
            border-radius: 4px;
            margin: 20px 0;
        }

        .details h3 {
            color: #012160;
            font-size: 18px;
            margin: 0 0 15px;
        }

        .details ul {
            margin: 0;
            padding-left: 20px;
        }

        .details li {
            margin-bottom: 8px;
        }

        .warning {
            color: #1564f4;
            font-style: italic;
            margin: 10px 0;
        }

        .features-list {
            margin: 10px 0;
        }

        .features-list ul {
            margin: 0;
            padding-left: 20px;
        }

        .features-list li {
            margin-bottom: 8px;
        }

        .footer {
            background-color: #f1efef;
            padding: 20px;
            text-align: center;
            margin-top: 30px;
        }

        .legal {
            font-size: 12px;
            color: #666;
            font-style: italic;
            margin: 5px 0;
        }

        p {
            margin: 0 0 15px;
            line-height: 1.6;
        }
    </style>
    <link href="https://fonts.googleapis.com/css?family=Cabin:400,700" rel="stylesheet" type="text/css">
    <link href="https://fonts.googleapis.com/css?family=Montserrat:400,700" rel="stylesheet" type="text/css">
</head>
<body>
    ${content}
</body>
</html>`;

export const emailTemplates: EmailTemplate[] = [
    {
        id: 'uat-deployment-notice',
        name: '7 Days Before UAT Deployment',
        category: 'deployment',
        subject: 'Release Train RT{version} - Upcoming UAT Deployment',
        template: getBaseEmailTemplate(`
            <div class="header">
                <h1>Release Train RT{version}</h1>
                <h2>Upcoming UAT Deployment</h2>
            </div>
            
            <div class="logo-section">
                <img src="https://share1.cloudhq-mkt3.net/bc9d4fe341ebe6.png" alt="ParkourSC Logo">
            </div>

            <div class="content">
                <p>Dear Team,</p>

                <p>We're preparing to deploy Release Train RT{version} to the UAT environment.</p>

                <div class="details">
                    <h3>Deployment Details:</h3>
                    <ul>
                        <li><strong>Release Version:</strong> RT{version}</li>
                        <li><strong>Planned Deployment Date:</strong> {deploymentDate}</li>
                        <li><strong>Environment:</strong> UAT</li>
                        <li><strong>Expected Downtime:</strong> {downtimeStart} to {downtimeEnd}</li>
                    </ul>
                </div>

                <div class="section">
                    <div class="section-icon checkmark">✓</div>
                    <div class="section-content">
                        <h3>What's Coming:</h3>
                        
                        <h4>New Features:</h4>
                        <div class="features-list">
                            {newFeatures}
                        </div>

                        <h4>General Platform Improvements:</h4>
                        <div class="features-list">
                            {improvements}
                        </div>
                    </div>
                </div>

                <p>Please prepare for testing and validation of these changes. You will receive a confirmation email once the deployment is complete.</p>

                <p>If you have any questions, please contact the Customer Success(CS) Team.</p>

                <p>Thank you for your partnership!</p>

                <p>The ParkourSC Customer Success Team</p>
            </div>

            <div class="footer">
                <p class="legal">© {year} ParkourSC. All Rights Reserved.</p>
                <p class="legal">STRICTLY CONFIDENTIAL. NOT FOR FURTHER DISTRIBUTION.</p>
            </div>
        `),
        fields: [
            {
                name: 'Release Version',
                key: 'version',
                type: 'text',
                placeholder: 'e.g., 24.1'
            },
            {
                name: 'Deployment Date',
                key: 'deploymentDate',
                type: 'text',
                placeholder: 'e.g., Jan 30, 2024 (10:00 AM PST)'
            },
            {
                name: 'Downtime Start',
                key: 'downtimeStart',
                type: 'text',
                placeholder: 'e.g., 10:00 AM PST'
            },
            {
                name: 'Downtime End',
                key: 'downtimeEnd',
                type: 'text',
                placeholder: 'e.g., 12:00 PM PST'
            },
            {
                name: 'New Features',
                key: 'newFeatures',
                type: 'richtext',
                placeholder: 'Type each feature on a new line, for example:\nEnhanced Search Functionality\nFaster Load Times\nBug Fixes\nUser Interface Overhaul\nExpanded Language Support'
            },
            {
                name: 'Improvements',
                key: 'improvements',
                type: 'richtext',
                placeholder: 'Type each improvement on a new line, for example:\nOptimized Database Queries\nImproved Error Handling\nEnhanced Security Features\nBetter Mobile Responsiveness\nUpdated Documentation'
            },
            {
                name: 'Year',
                key: 'year',
                type: 'text',
                placeholder: 'Current year'
            }
        ]
    },
    {
        id: 'uat-deployment-complete',
        name: 'UAT Deployment Complete',
        category: 'deployment',
        subject: 'Release Train RT{version} - Now Available in Preview',
        template: getBaseEmailTemplate(`
            <div class="header">
                <h1>Release Train RT{version}</h1>
                <h2>Now available in your Preview Environment!</h2>
            </div>
            
            <div class="logo-section">
                <img src="https://share1.cloudhq-mkt3.net/bc9d4fe341ebe6.png" alt="ParkourSC Logo">
            </div>

            <div class="content">
                <div class="section">
                    <div class="section-icon checkmark">✓</div>
                    <div class="section-content">
                        <h3>We're excited to introduce RT{version}</h3>
                        <p>The latest release was deployed and available in your <em><strong>Preview</strong></em> environment!</p>
                        <p>Please use the Preview period to explore the Release in the Preview environment, ask questions, and better understand the changes. As always, your current functionality will remain the same, and you will have time to adapt it to your business process. The new functionality will be there for you to use when you are ready!</p>
                    </div>
                </div>

                <div class="section">
                    <div class="section-icon exclamation">!</div>
                    <div class="section-content">
                        <h3>Upcoming Production Deployment</h3>
                        <p><strong>{prodDeploymentDate}</strong></p>
                        <p>Expected Downtime: <strong>{downtimeStart}</strong> to <strong>{downtimeEnd}</strong></p>
                        <p class="warning">Please note, during the maintenance window, the <em><strong>Production</strong></em> environment will be inaccessible, and all API calls should be paused. All operations can be resumed immediately after the maintenance window.</p>
                    </div>
                </div>

                <div class="section">
                    <div class="section-icon question">?</div>
                    <div class="section-content">
                        <h3>What's New?</h3>
                        <h4>New Features:</h4>
                        <div class="features-list">
                            {newFeatures}
                        </div>

                        <h4>General Platform Improvements:</h4>
                        <div class="features-list">
                            {improvements}
                        </div>
                    </div>
                </div>

                <p>Please feel free to contact the Customer Success(CS) Team with any questions.</p>
                <p>Thank you for your partnership!</p>
                <p>The ParkourSC Customer Success Team</p>
            </div>

            <div class="footer">
                <p class="legal">© {year} ParkourSC. All Rights Reserved.</p>
                <p class="legal">STRICTLY CONFIDENTIAL. NOT FOR FURTHER DISTRIBUTION.</p>
            </div>
        `),
        fields: [
            {
                name: 'Release Version',
                key: 'version',
                type: 'text',
                placeholder: 'e.g., 24.1'
            },
            {
                name: 'Production Deployment Date',
                key: 'prodDeploymentDate',
                type: 'text',
                placeholder: 'e.g., MMM DD, YYYY (HH:MM PM PST)'
            },
            {
                name: 'Downtime Start',
                key: 'downtimeStart',
                type: 'text',
                placeholder: 'e.g., HH:MM PM PST'
            },
            {
                name: 'Downtime End',
                key: 'downtimeEnd',
                type: 'text',
                placeholder: 'e.g., HH:MM PM PST'
            },
            {
                name: 'New Features',
                key: 'newFeatures',
                type: 'richtext',
                placeholder: 'Type each feature on a new line, for example:\nEnhanced Search Functionality\nFaster Load Times\nBug Fixes\nUser Interface Overhaul\nExpanded Language Support'
            },
            {
                name: 'Improvements',
                key: 'improvements',
                type: 'richtext',
                placeholder: 'Type each improvement on a new line, for example:\nOptimized Database Queries\nImproved Error Handling\nEnhanced Security Features\nBetter Mobile Responsiveness\nUpdated Documentation'
            },
            {
                name: 'Year',
                key: 'year',
                type: 'text',
                placeholder: 'Current year'
            }
        ]
    },
    {
        id: 'prod-deployment-start',
        name: 'Production Deployment Start',
        category: 'deployment',
        subject: 'Release Train RT{version} - Production Deployment Starting',
        template: getBaseEmailTemplate(`
            <div class="header">
                <h1>Release Train RT{version}</h1>
                <h2>Production Deployment Starting</h2>
            </div>
            
            <div class="logo-section">
                <img src="https://share1.cloudhq-mkt3.net/bc9d4fe341ebe6.png" alt="ParkourSC Logo">
            </div>

            <div class="content">
                <div class="section">
                    <div class="section-icon exclamation">!</div>
                    <div class="section-content">
                        <h3>IMPORTANT: Production Deployment in Progress</h3>
                        <p>Dear Valued Customers,</p>
                        <p>The deployment of Release Train RT{version} to Production has begun.</p>
                    </div>
                </div>

                <div class="details">
                    <h3>Deployment Details:</h3>
                    <ul>
                        <li><strong>Release Version:</strong> RT{version}</li>
                        <li><strong>Start Time:</strong> {startTime}</li>
                        <li><strong>Expected Duration:</strong> {duration}</li>
                        <li><strong>Expected Downtime:</strong> {downtimeStart} to {downtimeEnd}</li>
                    </ul>
                </div>

                <div class="warning">
                    <strong>IMPORTANT:</strong> During this maintenance window, the Production environment will be inaccessible, and all API calls should be paused.
                </div>

                <div class="section">
                    <div class="section-icon question">?</div>
                    <div class="section-content">
                        <h3>What's Being Deployed:</h3>
                        
                        <h4>New Features:</h4>
                        <div class="features-list">
                            {newFeatures}
                        </div>

                        <h4>General Platform Improvements:</h4>
                        <div class="features-list">
                            {improvements}
                        </div>
                    </div>
                </div>

                <p>You will receive a confirmation email once the deployment is complete and the system is available.</p>

                <p>Thank you for your patience and understanding.</p>

                <p>The ParkourSC Customer Success Team</p>
            </div>

            <div class="footer">
                <p class="legal">© {year} ParkourSC. All Rights Reserved.</p>
                <p class="legal">STRICTLY CONFIDENTIAL. NOT FOR FURTHER DISTRIBUTION.</p>
            </div>
        `),
        fields: [
            {
                name: 'Release Version',
                key: 'version',
                type: 'text',
                placeholder: 'e.g., 24.1'
            },
            {
                name: 'Start Time',
                key: 'startTime',
                type: 'text',
                placeholder: 'e.g., HH:MM PM PST'
            },
            {
                name: 'Expected Duration',
                key: 'duration',
                type: 'text',
                placeholder: 'e.g., 2 hours'
            },
            {
                name: 'Downtime Start',
                key: 'downtimeStart',
                type: 'text',
                placeholder: 'e.g., HH:MM PM PST'
            },
            {
                name: 'Downtime End',
                key: 'downtimeEnd',
                type: 'text',
                placeholder: 'e.g., HH:MM PM PST'
            },
            {
                name: 'New Features',
                key: 'newFeatures',
                type: 'richtext',
                placeholder: 'Type each feature on a new line, for example:\nEnhanced Search Functionality\nFaster Load Times\nBug Fixes\nUser Interface Overhaul\nExpanded Language Support'
            },
            {
                name: 'Improvements',
                key: 'improvements',
                type: 'richtext',
                placeholder: 'Type each improvement on a new line, for example:\nOptimized Database Queries\nImproved Error Handling\nEnhanced Security Features\nBetter Mobile Responsiveness\nUpdated Documentation'
            },
            {
                name: 'Year',
                key: 'year',
                type: 'text',
                placeholder: 'Current year'
            }
        ]
    },
    {
        id: 'prod-deployment-complete',
        name: 'Production Deployment Complete',
        category: 'deployment',
        subject: 'Release Train RT{version} - Now Available in Production',
        template: getBaseEmailTemplate(`
            <div class="header">
                <h1>Release Train RT{version}</h1>
                <h2>Now Available in Production!</h2>
            </div>
            
            <div class="logo-section">
                <img src="https://share1.cloudhq-mkt3.net/bc9d4fe341ebe6.png" alt="ParkourSC Logo">
            </div>

            <div class="content">
                <div class="section">
                    <div class="section-icon checkmark">✓</div>
                    <div class="section-content">
                        <h3>Successfully Deployed RT{version}</h3>
                        <p>We are pleased to inform you that Release Train RT{version} has been successfully deployed to Production.</p>
                    </div>
                </div>

                <div class="details">
                    <h3>Deployment Details:</h3>
                    <ul>
                        <li><strong>Release Version:</strong> RT{version}</li>
                        <li><strong>Deployment Completed:</strong> {completionTime}</li>
                        <li><strong>Environment:</strong> Production</li>
                        <li><strong>Total Downtime:</strong> {downtimeStart} to {downtimeEnd}</li>
                    </ul>
                </div>

                <p>The system is now available and API operations can resume.</p>

                <div class="section">
                    <div class="section-icon question">?</div>
                    <div class="section-content">
                        <h3>What's New in This Release:</h3>
                        
                        <h4>New Features:</h4>
                        <div class="features-list">
                            {newFeatures}
                        </div>

                        <h4>General Platform Improvements:</h4>
                        <div class="features-list">
                            {improvements}
                        </div>
                    </div>
                </div>

                <p>For detailed documentation, please refer to our release notes.</p>

                <p>Please feel free to contact the Customer Success(CS) Team with any questions.</p>
                <p>Thank you for your partnership!</p>

                <p>The ParkourSC Customer Success Team</p>
            </div>

            <div class="footer">
                <p class="legal">© {year} ParkourSC. All Rights Reserved.</p>
                <p class="legal">STRICTLY CONFIDENTIAL. NOT FOR FURTHER DISTRIBUTION.</p>
            </div>
        `),
        fields: [
            {
                name: 'Release Version',
                key: 'version',
                type: 'text',
                placeholder: 'e.g., 24.1'
            },
            {
                name: 'Completion Time',
                key: 'completionTime',
                type: 'text',
                placeholder: 'e.g., HH:MM PM PST'
            },
            {
                name: 'Downtime Start',
                key: 'downtimeStart',
                type: 'text',
                placeholder: 'e.g., HH:MM PM PST'
            },
            {
                name: 'Downtime End',
                key: 'downtimeEnd',
                type: 'text',
                placeholder: 'e.g., HH:MM PM PST'
            },
            {
                name: 'New Features',
                key: 'newFeatures',
                type: 'richtext',
                placeholder: 'Type each feature on a new line, for example:\nEnhanced Search Functionality\nFaster Load Times\nBug Fixes\nUser Interface Overhaul\nExpanded Language Support'
            },
            {
                name: 'Improvements',
                key: 'improvements',
                type: 'richtext',
                placeholder: 'Type each improvement on a new line, for example:\nOptimized Database Queries\nImproved Error Handling\nEnhanced Security Features\nBetter Mobile Responsiveness\nUpdated Documentation'
            },
            {
                name: 'Year',
                key: 'year',
                type: 'text',
                placeholder: 'Current year'
            }
        ]
    }
];
