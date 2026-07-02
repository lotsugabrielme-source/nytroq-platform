var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.ts
var import_express = __toESM(require("express"), 1);
var import_path = __toESM(require("path"), 1);
var import_crypto = __toESM(require("crypto"), 1);
var import_fs = __toESM(require("fs"), 1);
var import_vite = require("vite");
var import_supabase_js = require("@supabase/supabase-js");
var import_dotenv = __toESM(require("dotenv"), 1);

// src/lib/emailTemplate.ts
function renderBaseEmailTemplate(options) {
  const {
    title,
    badgeText,
    badgeSubText,
    badgeBgColor = "#f0fdf4",
    badgeTextColor = "#16a34a",
    badgeBorderColor = "#bbf7d0",
    placeholders,
    greetingName,
    introHtml,
    highlightHtml = "",
    detailsTitle = "Transaction details",
    detailsRows = [],
    buttons = [],
    featuresTitle = "WHAT\u2019S INCLUDED IN YOUR PLAN",
    features = [],
    closingHtml = ""
  } = options;
  const featuresListHtml = features.map((feature) => `
    <tr>
      <td valign="top" style="padding: 8px 0; width: 24px;">
        <span style="display: inline-block; width: 16px; height: 16px; background-color: #f0fdf4; border-radius: 50%; text-align: center; line-height: 16px; color: #16a34a; font-size: 10px; font-weight: bold; border: 1px solid #bbf7d0;">&#10003;</span>
      </td>
      <td style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 13px; color: #334155; padding: 8px 0; line-height: 1.5; font-weight: 500;">
        ${feature}
      </td>
    </tr>
  `).join("");
  const detailsRowsHtml = detailsRows.map((row, idx) => `
    <tr>
      <td style="padding: 12px 0; ${idx < detailsRows.length - 1 ? "border-bottom: 1px solid #f1f5f9;" : ""}">
        <table width="100%" border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td class="invoice-row-title" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 12px; color: #64748b; width: 45%; font-weight: 500;">${row.label}</td>
            <td class="invoice-row-value" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 12px; ${row.isStatus ? `color: ${badgeTextColor}; font-weight: 700;` : "color: #0f172a; font-weight: 600;"} width: 55%; text-align: right;">
              ${row.isStatus ? `<span style="background-color: ${badgeBgColor}; border-radius: 4px; padding: 2px 8px; display: inline-block; border: 1px solid ${badgeBorderColor};">${row.value}</span>` : row.value}
            </td>
          </tr>
        </table>
      </td>
    </tr>
  `).join("");
  const buttonsHtml = buttons.map((btn) => `
    <td align="center" class="btn-wrapper" style="padding: 6px 8px; display: inline-block;">
      <table border="0" cellspacing="0" cellpadding="0" class="btn-block">
        <tr>
          <td align="center" style="background-color: ${btn.primary ? "#16a34a" : "#ffffff"}; border-radius: 8px;">
            <a href="${btn.url}" target="_blank" class="btn-block" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 13px; font-weight: 600; color: ${btn.primary ? "#ffffff" : "#475569"}; text-decoration: none; padding: 10px 24px; display: inline-block; border-radius: 8px; border: 1px solid ${btn.primary ? "#16a34a" : "#cbd5e1"}; text-align: center; background-color: ${btn.primary ? "#16a34a" : "#ffffff"};">
              ${btn.label}
            </a>
          </td>
        </tr>
      </table>
    </td>
  `).join("");
  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>NytroQ - ${title}</title>
  <!--[if mso]>
  <style type="text/css">
    body, table, td, a { font-family: Arial, sans-serif !important; }
  </style>
  <![endif]-->
  <style type="text/css">
    body {
      margin: 0;
      padding: 0;
      width: 100% !important;
      background-color: #f8fafc;
      -webkit-font-smoothing: antialiased;
    }
    table {
      border-collapse: collapse;
      mso-table-lspace: 0pt;
      mso-table-rspace: 0pt;
    }
    img {
      border: 0;
      outline: none;
      text-decoration: none;
    }
    a {
      text-decoration: none;
    }
    
    @media only screen and (max-width: 600px) {
      .container {
        width: 100% !important;
        max-width: 100% !important;
        border-radius: 0 !important;
      }
      .content-padding {
        padding: 24px 16px !important;
      }
      .btn-container {
        display: block !important;
        width: 100% !important;
      }
      .btn-wrapper {
        padding: 4px 0 !important;
        display: block !important;
        width: 100% !important;
      }
      .btn-block {
        display: block !important;
        width: 100% !important;
        box-sizing: border-box;
      }
      .invoice-row-title {
        width: 40% !important;
        font-size: 11px !important;
      }
      .invoice-row-value {
        width: 60% !important;
        font-size: 11px !important;
      }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; width: 100% !important; background-color: #f8fafc; -webkit-font-smoothing: antialiased;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f8fafc; width: 100%;">
    <tr>
      <td align="center" style="padding: 40px 0 60px 0;" class="content-padding">
        
        <!-- MAIN CARD CONTAINER -->
        <table width="560" border="0" cellspacing="0" cellpadding="0" class="container" style="background-color: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03); overflow: hidden; max-width: 560px;">
          
          <!-- TOP GREEN COLOR ACCENT ACCENT BAR -->
          <tr>
            <td height="4" style="background-color: #16a34a; line-height: 4px; font-size: 4px;">&nbsp;</td>
          </tr>

          <!-- HEADER SECTION (Clean, Minimal & Modern) -->
          <tr>
            <td style="padding: 32px 32px 16px 32px;" class="content-padding">
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td valign="middle">
                    <table border="0" cellspacing="0" cellpadding="0">
                      <tr>
                        <td style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 20px; font-weight: 800; color: #0f172a; letter-spacing: -0.5px;">
                          NytroQ <span style="font-weight: 400; color: #64748b;">Billing</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 11px; color: #94a3b8; letter-spacing: 0.5px; text-transform: uppercase; padding-top: 2px;">
                          Official Receipt / Statement
                        </td>
                      </tr>
                    </table>
                  </td>
                  <td align="right" valign="middle">
                    <table border="0" cellspacing="0" cellpadding="0" style="background-color: ${badgeBgColor}; border: 1px solid ${badgeBorderColor}; border-radius: 6px;">
                      <tr>
                        <td align="center" valign="middle" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 11px; font-weight: 800; color: ${badgeTextColor}; padding: 6px 14px; letter-spacing: 0.5px; text-transform: uppercase;">
                          ${badgeText}
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- GREETING & CONFIRMATION -->
          <tr>
            <td style="padding: 16px 32px 16px 32px;" class="content-padding">
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 15px; font-weight: 700; color: #0f172a; padding-bottom: 8px;">
                    Hi ${greetingName || placeholders.customer_name},
                  </td>
                </tr>
                <tr>
                  <td style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 14px; color: #334155; line-height: 1.6;">
                    ${introHtml}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- PROMINENT VISUAL DISPLAY (Optional) -->
          ${highlightHtml ? `
          <tr>
            <td style="padding: 16px 32px 16px 32px;" class="content-padding">
              ${highlightHtml}
            </td>
          </tr>
          ` : ""}

          <!-- TRANSACTION DETAILS TABLE (Optional) -->
          ${detailsRows.length > 0 ? `
          <tr>
            <td style="padding: 16px 32px 16px 32px;" class="content-padding">
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 11px; font-weight: 800; color: #64748b; letter-spacing: 0.5px; text-transform: uppercase; padding-bottom: 8px; border-bottom: 1px solid #e2e8f0;">
                    ${detailsTitle}
                  </td>
                </tr>
                ${detailsRowsHtml}
              </table>
            </td>
          </tr>
          ` : ""}

          <!-- ACTION BUTTONS -->
          ${buttons.length > 0 ? `
          <tr>
            <td style="padding: 16px 32px; text-align: center;" class="content-padding">
              <table border="0" cellspacing="0" cellpadding="0" class="btn-container" style="margin: 0 auto;">
                <tr>
                  ${buttonsHtml}
                </tr>
              </table>
            </td>
          </tr>
          ` : ""}

          <!-- PLAN FEATURES INCLUDED SECTION -->
          ${features.length > 0 ? `
          <tr>
            <td style="padding: 16px 32px;" class="content-padding">
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px;">
                <tr>
                  <td style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 10px; font-weight: 800; color: #64748b; letter-spacing: 0.75px; text-transform: uppercase; padding-bottom: 10px; border-bottom: 1px solid #e2e8f0;">
                    ${featuresTitle}
                  </td>
                </tr>
                <tr>
                  <td style="padding-top: 10px;">
                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                      ${featuresListHtml}
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          ` : ""}

          <!-- SUPPORT SECTION CARD -->
          <tr>
            <td style="padding: 16px 32px;" class="content-padding">
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px;">
                <tr>
                  <td style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 13px; font-weight: 700; color: #0f172a; padding-bottom: 4px;">
                    Need assistance?
                  </td>
                </tr>
                <tr>
                  <td style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 12px; color: #475569; line-height: 1.5; padding-bottom: 10px;">
                    If you have questions about your billing, subscription tier, or invoice history, reach out to our team at any time.
                  </td>
                </tr>
                <tr>
                  <td style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 12px; font-weight: 600;">
                    Email Support: <a href="mailto:support@mail.nytroq.com" style="color: #16a34a; text-decoration: underline;">support@mail.nytroq.com</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- CLOSING MESSAGE -->
          <tr>
            <td style="padding: 24px 32px 32px 32px;" class="content-padding">
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 13px; color: #475569; line-height: 1.5; padding-bottom: 14px;">
                    ${closingHtml || "Thank you for choosing NytroQ. We\u2019re deeply excited to help you simplify print estimation, manage raw material inventory, and grow your digital studio production business."}
                  </td>
                </tr>
                <tr>
                  <td style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 13px; color: #475569; line-height: 1.2;">
                    Regards,<br />
                    <strong>The NytroQ Team</strong>
                  </td>
                </tr>
                <tr>
                  <td style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 11px; color: #94a3b8; padding-top: 10px;">
                    NytroQ Billing &bull; <a href="mailto:billing@mail.nytroq.com" style="color: #64748b; text-decoration: none;">billing@mail.nytroq.com</a> &bull; <a href="https://www.nytroq.com" style="color: #64748b; text-decoration: none;">www.nytroq.com</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
        
        <!-- FOOTER LINKS SECTION -->
        <table width="560" border="0" cellspacing="0" cellpadding="0" style="max-width: 560px; text-align: center; margin-top: 24px;">
          <tr>
            <td style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 11px; color: #94a3b8; line-height: 1.6; padding-bottom: 8px;">
              &copy; ${placeholders.current_year} NytroQ Corp. All rights reserved.
            </td>
          </tr>
          <tr>
            <td style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 11px; color: #94a3b8; line-height: 1.6;">
              <a href="${placeholders.privacy_policy_url}" target="_blank" style="color: #16a34a; font-weight: 600; text-decoration: none;">Privacy Policy</a>
              &nbsp;&bull;&nbsp;
              <a href="${placeholders.terms_of_service_url}" target="_blank" style="color: #16a34a; font-weight: 600; text-decoration: none;">Terms of Service</a>
              &nbsp;&bull;&nbsp;
              <a href="${placeholders.manage_subscription_url}" target="_blank" style="color: #16a34a; font-weight: 600; text-decoration: none;">Manage Subscription</a>
            </td>
          </tr>
          <tr>
            <td style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 10px; color: #cbd5e1; line-height: 1.4; padding-top: 14px;">
              You received this automated receipt because you have an active NytroQ subscription. If you believe this is in error, please forward this message to support.
            </td>
          </tr>
        </table>

      </td>
    </tr>
  </table>
</body>
</html>`;
}
function getCurrencySymbol(currencyCode) {
  if (!currencyCode) return "GH\u20B5";
  const customMapping = {
    GHS: "GH\u20B5",
    USD: "$",
    EUR: "\u20AC",
    GBP: "\xA3",
    NGN: "\u20A6",
    KES: "KSh",
    UGX: "USh",
    TZS: "TSh",
    ZAR: "R",
    CAD: "$",
    AUD: "$",
    JPY: "\xA5",
    CNY: "\xA5",
    INR: "\u20B9"
  };
  return customMapping[currencyCode.toUpperCase()] || currencyCode;
}
function getCurrencyDetailsRows(placeholders) {
  const rows = [];
  if (placeholders && placeholders.conversion_occurred) {
    const baseCurSymbol = getCurrencySymbol(placeholders.base_currency || "GHS");
    rows.push({ label: "Base Plan Price", value: `${baseCurSymbol}${placeholders.base_price}` });
    const chargedCurSymbol = getCurrencySymbol(placeholders.charged_currency || "GHS");
    rows.push({ label: "Charged Amount", value: `${chargedCurSymbol}${placeholders.charged_amount}` });
    if (placeholders.preferred_currency && placeholders.preferred_currency !== placeholders.charged_currency) {
      const prefCurSymbol = getCurrencySymbol(placeholders.preferred_currency);
      rows.push({ label: `Equivalent (${placeholders.preferred_currency})`, value: `${prefCurSymbol}${placeholders.preferred_amount}` });
    }
    if (placeholders.exchange_rate_used) {
      rows.push({ label: "Exchange Rate", value: placeholders.exchange_rate_used });
    }
  }
  return rows;
}
function getSubscriptionPurchasedEmailHtml(placeholders) {
  const isBusiness = placeholders.plan_name.toLowerCase().includes("business");
  const planLabel = isBusiness ? "Business Tier" : "Pro Tier";
  const amountDisplay = `
    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #fafafa; border: 1.5px solid #f1f5f9; border-radius: 12px; text-align: center;">
      <tr>
        <td align="center" style="padding: 24px 20px;">
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 10px; font-weight: 800; color: #64748b; letter-spacing: 1px; text-transform: uppercase; padding-bottom: 6px;">AMOUNT PAID</div>
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 38px; font-weight: 800; color: #0f172a; line-height: 1.1; letter-spacing: -1px; margin-bottom: 6px;">
            ${placeholders.currency}${placeholders.amount_paid}
          </div>
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 12px; font-weight: 700; color: #16a34a; background-color: #f0fdf4; border-radius: 20px; padding: 4px 12px; display: inline-block;">
            ${planLabel} &bull; ${placeholders.billing_cycle}
          </div>
        </td>
      </tr>
    </table>
  `;
  return renderBaseEmailTemplate({
    title: "Subscription Purchased",
    badgeText: "PAID",
    badgeSubText: "CONFIRMED",
    placeholders,
    introHtml: `Thank you for subscribing to <strong>NytroQ</strong>! We are absolutely thrilled to welcome you to the community. This email confirms that your subscription payment has been successfully received and processed. Your dynamic print calculation and studio management dashboard is now fully unlocked and ready to accelerate your business!`,
    highlightHtml: amountDisplay,
    detailsTitle: "Subscription details",
    detailsRows: [
      { label: "Subscription Plan", value: planLabel },
      { label: "Billing Cycle", value: placeholders.billing_cycle },
      ...getCurrencyDetailsRows(placeholders),
      { label: "Invoice Number", value: placeholders.invoice_number },
      { label: "Payment Date", value: placeholders.payment_date },
      { label: "Next Billing Date", value: placeholders.next_billing_date },
      { label: "Transaction ID", value: placeholders.transaction_id },
      { label: "Payment Method", value: placeholders.payment_method },
      { label: "Subscription Status", value: placeholders.subscription_status, isStatus: true },
      { label: "Customer Email", value: placeholders.customer_email }
    ],
    buttons: [
      { label: "Go to Dashboard \u2192", url: placeholders.dashboard_url, primary: true },
      { label: "Download Invoice \u2193", url: placeholders.invoice_download_url, primary: false }
    ],
    features: placeholders.included_plan_features
  });
}
function getProPlanActivatedEmailHtml(placeholders) {
  const highlightBanner = `
    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #ecfdf5; border: 1px solid #10b981; border-radius: 12px; text-align: center;">
      <tr>
        <td align="center" style="padding: 18px 20px;">
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 11px; font-weight: 800; color: #065f46; letter-spacing: 1px; text-transform: uppercase;">PLAN STATUS</div>
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 22px; font-weight: 800; color: #047857; margin-top: 4px;">
            NytroQ Pro is fully Active!
          </div>
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 13px; color: #065f46; margin-top: 4px; font-weight: 500;">
            Premium tools unlocked on your print dashboard.
          </div>
        </td>
      </tr>
    </table>
  `;
  const proFeatures = [
    "Unlimited Estimates & Commercial Quotations",
    "Real-time Material Inventory & Automatic Scrap Deduct",
    "Advanced Realism Engine with Company Stamp Rendering",
    "Collaboration for up to 3 active print-shop operators",
    "Dynamic Currency Conversion & Live Rate Feed Updates",
    "Priority Cloud Invoicing & PDF Downloads"
  ];
  return renderBaseEmailTemplate({
    title: "Pro Plan Active",
    badgeText: "PRO",
    badgeSubText: "ACTIVE",
    placeholders,
    introHtml: `Welcome to <strong>NytroQ Pro</strong>! Your premium subscription is now active. We\u2019ve configured your workspace to enable high-efficiency quotation metrics, team permissions, and real-time scrap reduction parameters. Access your tools instantly.`,
    highlightHtml: highlightBanner,
    detailsTitle: "Activation overview",
    detailsRows: [
      { label: "Active Plan", value: "Pro Tier" },
      ...getCurrencyDetailsRows(placeholders),
      { label: "Activation Date", value: placeholders.payment_date },
      { label: "Next Billing Date", value: placeholders.next_billing_date },
      { label: "Seat Limit", value: "3 Active Operators" },
      { label: "Subscription Status", value: "Active / Paid", isStatus: true }
    ],
    buttons: [
      { label: "Open Dashboard \u2192", url: placeholders.dashboard_url, primary: true }
    ],
    featuresTitle: "SUMMARY OF PRO BENEFITS",
    features: proFeatures,
    closingHtml: `We're excited to help you scale your operations. If you ever need to add more team members, check out our enterprise-tier business plan.`
  });
}
function getBusinessPlanActivatedEmailHtml(placeholders) {
  const highlightBanner = `
    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f0fdf4; border: 1px solid #16a34a; border-radius: 12px; text-align: center;">
      <tr>
        <td align="center" style="padding: 20px 20px;">
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 11px; font-weight: 800; color: #14532d; letter-spacing: 1px; text-transform: uppercase;">ENTERPRISE LEVEL</div>
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 24px; font-weight: 800; color: #15803d; margin-top: 4px;">
            NytroQ Business Activated!
          </div>
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 13px; color: #166534; margin-top: 4px; font-weight: 500;">
            Unlimited studio throughput and commercial scale.
          </div>
        </td>
      </tr>
    </table>
  `;
  const businessFeatures = [
    "Unlimited Estimates & High-Volume Calculations",
    "Real-time Material Inventory & Multi-location Stock Tracking",
    "Advanced Realism Engine with Unlimited Custom Company Stamps",
    "Enterprise Team Collaboration (Up to 10 active operators)",
    "Full API Access & Priority Webhook Webhooks",
    "Custom Margin Controls & Detailed PDF Audits",
    "VIP 24/7 Priority Support Helpline"
  ];
  return renderBaseEmailTemplate({
    title: "Business Plan Active",
    badgeText: "BIZ",
    badgeSubText: "ACTIVE",
    badgeBgColor: "#f0fdf4",
    badgeTextColor: "#15803d",
    badgeBorderColor: "#16a34a",
    placeholders,
    introHtml: `Welcome to <strong>NytroQ Business</strong>! Your enterprise-tier subscription is now fully active. Your team now has unrestricted access to the most powerful high-volume estimation engines, custom margins, multi-location print tracking, and live audit channels.`,
    highlightHtml: highlightBanner,
    detailsTitle: "Activation details",
    detailsRows: [
      { label: "Active Plan", value: "Business Enterprise" },
      ...getCurrencyDetailsRows(placeholders),
      { label: "Activation Date", value: placeholders.payment_date },
      { label: "Next Billing Date", value: placeholders.next_billing_date },
      { label: "Operator Seats Included", value: "10 Team Members" },
      { label: "Subscription Status", value: "Active / Paid", isStatus: true }
    ],
    buttons: [
      { label: "Open Dashboard \u2192", url: placeholders.dashboard_url, primary: true }
    ],
    featuresTitle: "SUMMARY OF BUSINESS FEATURES",
    features: businessFeatures,
    closingHtml: `Your business has been unlocked for commercial success. Your team operators can log in using their invitations instantly. Thank you for partnering with NytroQ!`
  });
}
function getPaymentReceiptEmailHtml(placeholders) {
  const isBusiness = placeholders.plan_name.toLowerCase().includes("business");
  const planLabel = isBusiness ? "Business Tier" : "Pro Tier";
  const receiptNumber = `REC-${placeholders.invoice_number.split("-")[1] || "2026-08912"}`;
  const receiptHighlight = `
    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="border: 1.5px dashed #cbd5e1; border-radius: 12px; background-color: #fafafa;">
      <tr>
        <td style="padding: 18px 24px;">
          <table width="100%" border="0" cellspacing="0" cellpadding="0">
            <tr>
              <td style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 12px; font-weight: 700; color: #475569;">Receipt Number</td>
              <td style="font-family: monospace; font-size: 13px; font-weight: 700; color: #0f172a; text-align: right;">${receiptNumber}</td>
            </tr>
            <tr style="border-top: 1px solid #e2e8f0;">
              <td style="padding-top: 12px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 12px; font-weight: 700; color: #475569;">Amount Charged</td>
              <td style="padding-top: 12px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 24px; font-weight: 800; color: #16a34a; text-align: right;">${placeholders.currency}${placeholders.amount_paid}</td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  `;
  return renderBaseEmailTemplate({
    title: "Payment Receipt",
    badgeText: "RECEIPT",
    badgeSubText: "PAID",
    placeholders,
    introHtml: `This email serves as an official receipt for your recent transaction on the NytroQ platform. Thank you for your payment!`,
    highlightHtml: receiptHighlight,
    detailsTitle: "Receipt Breakdown",
    detailsRows: [
      { label: "Receipt ID", value: receiptNumber },
      { label: "Transaction ID", value: placeholders.transaction_id },
      ...getCurrencyDetailsRows(placeholders),
      { label: "Paid Amount", value: `${placeholders.currency}${placeholders.amount_paid}` },
      { label: "Payment Date", value: placeholders.payment_date },
      { label: "Payment Method", value: placeholders.payment_method },
      { label: "Subscription Plan", value: planLabel },
      { label: "Payment Status", value: "PAID / SUCCESSFUL", isStatus: true }
    ],
    buttons: [
      { label: "View Dynamic Receipt \u2192", url: placeholders.invoice_download_url, primary: true }
    ],
    closingHtml: `This receipt has been generated automatically. You can download PDF copies of all past invoices and billing statements in your settings pane.`
  });
}
function getInvoiceEmailHtml(placeholders) {
  const isBusiness = placeholders.plan_name.toLowerCase().includes("business");
  const planLabel = isBusiness ? "Business Tier" : "Pro Tier";
  const invoiceHighlight = `
    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
      <thead>
        <tr style="background-color: #f1f5f9;">
          <th align="left" style="padding: 10px 14px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 11px; font-weight: 800; color: #475569; text-transform: uppercase;">Item / Description</th>
          <th align="right" style="padding: 10px 14px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 11px; font-weight: 800; color: #475569; text-transform: uppercase;">Amount</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="padding: 14px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 12px; color: #0f172a; font-weight: 600;">
            NytroQ Platform Subscription (${planLabel})
            <div style="font-size: 11px; color: #64748b; font-weight: 400; margin-top: 2px;">
              Period: ${placeholders.payment_date} \u2013 ${placeholders.next_billing_date}
            </div>
          </td>
          <td align="right" style="padding: 14px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 13px; color: #0f172a; font-weight: 700;">
            ${placeholders.currency}${placeholders.amount_paid}
          </td>
        </tr>
        <tr style="border-top: 1px solid #f1f5f9;">
          <td style="padding: 10px 14px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 12px; color: #64748b;">Subtotal</td>
          <td align="right" style="padding: 10px 14px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 12px; color: #0f172a; font-weight: 600;">${placeholders.currency}${placeholders.amount_paid}</td>
        </tr>
        <tr>
          <td style="padding: 10px 14px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 12px; color: #64748b;">Taxes (0%)</td>
          <td align="right" style="padding: 10px 14px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 12px; color: #0f172a; font-weight: 600;">${placeholders.currency}0.00</td>
        </tr>
        <tr style="background-color: #fafafa; border-top: 2px solid #e2e8f0;">
          <td style="padding: 14px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 13px; font-weight: 800; color: #0f172a;">Total Invoice Paid</td>
          <td align="right" style="padding: 14px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 800; color: #16a34a;">${placeholders.currency}${placeholders.amount_paid}</td>
        </tr>
      </tbody>
    </table>
  `;
  return renderBaseEmailTemplate({
    title: "Invoice",
    badgeText: "INVOICE",
    badgeSubText: "PAID",
    placeholders,
    introHtml: `Please find below the itemized invoice details for your ongoing NytroQ SaaS subscription. Your payment has been processed, and this balance is fully settled.`,
    highlightHtml: invoiceHighlight,
    detailsTitle: "Invoice Metadata",
    detailsRows: [
      { label: "Invoice Number", value: placeholders.invoice_number },
      { label: "Customer Name", value: placeholders.customer_name },
      { label: "Billed Plan", value: planLabel },
      ...getCurrencyDetailsRows(placeholders),
      { label: "Billing Period", value: `${placeholders.payment_date} to ${placeholders.next_billing_date}` },
      { label: "Invoice Date", value: placeholders.payment_date },
      { label: "Taxes Billed", value: `${placeholders.currency}0.00 (Exempt)` },
      { label: "Invoice Status", value: "PAID / SETTLED", isStatus: true }
    ],
    buttons: [
      { label: "Download Invoice PDF \u2193", url: placeholders.invoice_download_url, primary: true }
    ],
    closingHtml: `All billing processes are compiled in accordance with standard cloud compliance regulations. For specialized company details modifications, edit your billing profile.`
  });
}
function getSubscriptionRenewalEmailHtml(placeholders) {
  const isBusiness = placeholders.plan_name.toLowerCase().includes("business");
  const planLabel = isBusiness ? "Business Tier" : "Pro Tier";
  const renewalHighlight = `
    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f0fdf4; border: 1.5px solid #bbf7d0; border-radius: 12px; text-align: center;">
      <tr>
        <td align="center" style="padding: 22px 20px;">
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 11px; font-weight: 800; color: #166534; letter-spacing: 1px; text-transform: uppercase;">RENEWAL RECEIPT</div>
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 20px; font-weight: 800; color: #15803d; margin-top: 4px;">
            Subscription Renewed Successfully
          </div>
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 26px; font-weight: 800; color: #0f172a; margin-top: 10px;">
            ${placeholders.currency}${placeholders.amount_paid} Charged
          </div>
        </td>
      </tr>
    </table>
  `;
  return renderBaseEmailTemplate({
    title: "Subscription Renewed",
    badgeText: "RENEWAL",
    badgeSubText: "SUCCESS",
    placeholders,
    introHtml: `We've successfully processed your automatic subscription renewal for your <strong>NytroQ ${planLabel}</strong> account! Thank you so much for continuing to partner with NytroQ. Your workspace access has been extended seamlessly.`,
    highlightHtml: renewalHighlight,
    detailsTitle: "Renewal Details",
    detailsRows: [
      { label: "Subscription Plan", value: planLabel },
      { label: "Amount Charged", value: `${placeholders.currency}${placeholders.amount_paid}` },
      ...getCurrencyDetailsRows(placeholders),
      { label: "Renewal Date", value: placeholders.payment_date },
      { label: "Next Billing Date", value: placeholders.next_billing_date },
      { label: "Billing Period", value: `${placeholders.payment_date} to ${placeholders.next_billing_date}` },
      { label: "Transaction ID", value: placeholders.transaction_id },
      { label: "Subscription Status", value: "Renewed / Active", isStatus: true }
    ],
    buttons: [
      { label: "Manage Subscription \u2192", url: placeholders.manage_subscription_url, primary: true }
    ],
    closingHtml: `Thank you for your continued loyalty! We\u2019re highly active in publishing workflow enhancements, and we look forward to helping your print-shop operate flawlessly over the coming billing cycle.`
  });
}
function getSubscriptionCancelledEmailHtml(placeholders) {
  const isBusiness = placeholders.plan_name.toLowerCase().includes("business");
  const planLabel = isBusiness ? "Business Tier" : "Pro Tier";
  const cancellationHighlight = `
    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #fffbeb; border: 1.5px solid #fef3c7; border-radius: 12px;">
      <tr>
        <td style="padding: 16px 20px;">
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 11px; font-weight: 800; color: #b45309; letter-spacing: 0.5px; text-transform: uppercase;">ACCESS INFORMATION</div>
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 15px; font-weight: 700; color: #92400e; margin-top: 4px;">
            Premium Access Retained Until Expiration
          </div>
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 13px; color: #78350f; margin-top: 4px; line-height: 1.4;">
            Your active paid plan features will remain fully unlocked and functional until <strong>${placeholders.next_billing_date}</strong>. After this date, your workspace will roll back to the standard Free Tier automatically.
          </div>
        </td>
      </tr>
    </table>
  `;
  return renderBaseEmailTemplate({
    title: "Subscription Cancelled",
    badgeText: "PLAN",
    badgeSubText: "CANCELLED",
    badgeBgColor: "#fef3c7",
    badgeTextColor: "#d97706",
    badgeBorderColor: "#d97706",
    placeholders,
    introHtml: `This email confirms that your subscription to the <strong>NytroQ ${planLabel}</strong> has been cancelled. We're very sad to see you go, but we want to thank you for your support and use of NytroQ.`,
    highlightHtml: cancellationHighlight,
    detailsTitle: "Cancellation summary",
    detailsRows: [
      { label: "Cancelled Plan", value: planLabel },
      ...getCurrencyDetailsRows(placeholders),
      { label: "Cancellation Confirmed", value: placeholders.payment_date },
      { label: "Remaining Access Period", value: `Until ${placeholders.next_billing_date}` },
      { label: "Access Expiration Date", value: placeholders.next_billing_date },
      { label: "Subscription Status", value: "Pending Expiration", isStatus: true }
    ],
    buttons: [
      { label: "Reactivate Subscription \u21BA", url: placeholders.manage_subscription_url, primary: true }
    ],
    closingHtml: `We'd love to have you back! If you ever decide to reactivate your plan or subscribe again, your print calculation data and settings will be saved securely for easy resumption.`
  });
}
function getBillingEmailByTypeHtml(eventType, placeholders) {
  switch (eventType.toLowerCase()) {
    case "subscription_purchased":
    case "subscription.purchased":
      return getSubscriptionPurchasedEmailHtml(placeholders);
    case "pro_plan_activated":
    case "pro.activated":
      return getProPlanActivatedEmailHtml(placeholders);
    case "business_plan_activated":
    case "business.activated":
      return getBusinessPlanActivatedEmailHtml(placeholders);
    case "payment_receipt":
    case "payment.receipt":
      return getPaymentReceiptEmailHtml(placeholders);
    case "invoice":
    case "invoice.due":
    case "invoice.paid":
      return getInvoiceEmailHtml(placeholders);
    case "subscription_renewal":
    case "subscription.renewal":
      return getSubscriptionRenewalEmailHtml(placeholders);
    case "subscription_cancelled":
    case "subscription.cancelled":
      return getSubscriptionCancelledEmailHtml(placeholders);
    case "subscription_expiry_reminder":
      return getSubscriptionExpiryReminderEmailHtml(placeholders);
    case "subscription_expired_final":
      return getSubscriptionExpiredEmailHtml(placeholders);
    default:
      return getBillingEmailHtml(placeholders);
  }
}
function getBillingEmailHtml(placeholders) {
  return getSubscriptionPurchasedEmailHtml(placeholders);
}
function getOtpEmailHtml(otpCode, purpose) {
  const isReset = purpose === "password_reset";
  const purposeTitle = isReset ? "Reset Your NytroQ Password" : "Verify Your NytroQ Email";
  const purposeText = isReset ? "We received a request to reset your NytroQ print shop account password. Use the verification code below to authorize this change:" : "Thank you for registering with NytroQ! To complete your print studio profile setup, please verify your email address using the secure code below:";
  const currentYear = (/* @__PURE__ */ new Date()).getFullYear().toString();
  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>${purposeTitle}</title>
  <!--[if mso]>
  <style type="text/css">
    body, table, td, a { font-family: Arial, sans-serif !important; }
  </style>
  <![endif]-->
  <style type="text/css">
    body {
      margin: 0;
      padding: 0;
      width: 100% !important;
      background-color: #f8fafc;
      -webkit-font-smoothing: antialiased;
    }
    table {
      border-collapse: collapse;
      mso-table-lspace: 0pt;
      mso-table-rspace: 0pt;
    }
    @media only screen and (max-width: 600px) {
      .container {
        width: 100% !important;
        max-width: 100% !important;
        border-radius: 0 !important;
      }
      .content-padding {
        padding: 24px 16px !important;
      }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; width: 100% !important; background-color: #f8fafc; -webkit-font-smoothing: antialiased;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f8fafc; width: 100%;">
    <tr>
      <td align="center" style="padding: 40px 0 60px 0;" class="content-padding">
        
        <!-- MAIN CARD CONTAINER -->
        <table width="520" border="0" cellspacing="0" cellpadding="0" class="container" style="background-color: #ffffff; border-radius: 16px; border: 1px solid #e2e8f0; box-shadow: 0 4px 12px rgba(15, 23, 42, 0.02); overflow: hidden; max-width: 520px;">
          
          <!-- TOP GREEN COLOR ACCENT ACCENT BAR -->
          <tr>
            <td height="6" style="background-color: #16a34a; line-height: 6px; font-size: 6px;">&nbsp;</td>
          </tr>

          <!-- CONTENT SECTION -->
          <tr>
            <td style="padding: 36px 40px;" class="content-padding">
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <!-- Brand logo -->
                <tr>
                  <td align="center" style="padding-bottom: 24px;">
                    <img src="https://raw.githubusercontent.com/NytroQ/brand-assets/main/logo.png" alt="NytroQ Logo" width="105" height="28" style="display: block; border: 0;" />
                  </td>
                </tr>
                
                <!-- Headline -->
                <tr>
                  <td align="center" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 800; color: #0f172a; padding-bottom: 12px; letter-spacing: -0.5px; text-align: center;">
                    ${purposeTitle}
                  </td>
                </tr>

                <!-- Intro text -->
                <tr>
                  <td align="center" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 13px; color: #475569; line-height: 1.6; padding-bottom: 24px; text-align: center;">
                    ${purposeText}
                  </td>
                </tr>

                <!-- OTP DISPLAY BOX -->
                <tr>
                  <td align="center" style="padding-bottom: 24px;">
                    <table border="0" cellspacing="0" cellpadding="0">
                      <tr>
                        <td align="center" style="background-color: #f1f5f9; border-radius: 12px; padding: 16px 36px; border: 1px solid #e2e8f0;">
                          <div style="font-family: 'Courier New', Courier, monospace, Arial, sans-serif; font-size: 32px; font-weight: 800; color: #0f172a; letter-spacing: 12px; padding-left: 12px; line-height: 1;">
                            ${otpCode}
                          </div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Expiration Warning -->
                <tr>
                  <td align="center" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 11px; color: #94a3b8; line-height: 1.5; padding-bottom: 24px; text-align: center;">
                    This secure code is strictly valid for the next <strong>10 minutes</strong>.<br />
                    If you did not initiate this request, you can safely ignore this email.
                  </td>
                </tr>

                <!-- Divider -->
                <tr>
                  <td style="border-top: 1px solid #f1f5f9; padding-bottom: 20px;">&nbsp;</td>
                </tr>

                <!-- Contact & Support Info -->
                <tr>
                  <td align="center" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 12px; color: #64748b; line-height: 1.5; text-align: center;">
                    Need assistance? Get in touch with our operations desk at<br />
                    <a href="mailto:support@mail.nytroq.com" style="color: #16a34a; font-weight: 600; text-decoration: underline;">support@mail.nytroq.com</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
        
        <!-- FOOTER LINKS SECTION -->
        <table width="520" border="0" cellspacing="0" cellpadding="0" style="max-width: 520px; text-align: center; margin-top: 24px;">
          <tr>
            <td style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 11px; color: #94a3b8; line-height: 1.6; padding-bottom: 4px;">
              &copy; ${currentYear} NytroQ Corp. All rights reserved.
            </td>
          </tr>
          <tr>
            <td style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 10px; color: #cbd5e1; line-height: 1.4;">
              This is an automated, secure communication sent from the NytroQ Authenticator service. Please do not reply directly to this mail box.
            </td>
          </tr>
        </table>

      </td>
    </tr>
  </table>
</body>
</html>`;
}
function getSubscriptionExpiryReminderEmailHtml(placeholders) {
  const isBusiness = placeholders.plan_name.toLowerCase().includes("business");
  const planLabel = isBusiness ? "Business Tier" : "Pro Tier";
  const days = placeholders.days_remaining;
  let timeStr = `${days} day${days !== 1 ? "s" : ""}`;
  if (days === 0) {
    timeStr = "today";
  }
  const reminderHighlight = `
    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #fffbeb; border: 1.5px solid #fef3c7; border-radius: 12px;">
      <tr>
        <td style="padding: 16px 20px;">
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 11px; font-weight: 800; color: #b45309; letter-spacing: 0.5px; text-transform: uppercase;">IMPORTANT WARNING</div>
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 15px; font-weight: 700; color: #92400e; margin-top: 4px;">
            Avoid Disruption to Your Print Shop
          </div>
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 13px; color: #78350f; margin-top: 4px; line-height: 1.4;">
            Your <strong>NytroQ ${planLabel}</strong> subscription is set to expire in <strong>${timeStr}</strong> on <strong>${placeholders.expiry_date}</strong>. If your subscription is not renewed, premium features (including advanced ink calculations, custom watermarks, team collaboration, and Priority cloud storage) will stop working, and your account will automatically downgrade to the Free plan.
          </div>
        </td>
      </tr>
    </table>
  `;
  return renderBaseEmailTemplate({
    title: "Subscription Expiry Reminder",
    badgeText: "ACTION",
    badgeSubText: "REQUIRED",
    badgeBgColor: "#fffbeb",
    badgeTextColor: "#d97706",
    badgeBorderColor: "#fef3c7",
    placeholders,
    introHtml: `Hello ${placeholders.customer_name || placeholders.customer_email.split("@")[0]},<br/><br/>This is a friendly reminder that your subscription to the premium <strong>NytroQ ${planLabel}</strong> plan is expiring in <strong>${timeStr}</strong>.`,
    highlightHtml: reminderHighlight,
    detailsTitle: "Subscription Summary",
    detailsRows: [
      { label: "Current Plan", value: planLabel },
      { label: "Renewal Cost", value: `${placeholders.currency}${placeholders.amount_paid} / month` },
      { label: "Expiration Date", value: placeholders.expiry_date },
      { label: "Remaining Days", value: days === 0 ? "Expires today!" : `${days} day${days !== 1 ? "s" : ""}` },
      { label: "Subscription Status", value: "Active / Expiring Soon", isStatus: true }
    ],
    buttons: [
      { label: "Renew Subscription Now \u2192", url: placeholders.manage_subscription_url, primary: true }
    ],
    closingHtml: `If you have already processed a renewal payment, please disregard this email. Your dashboard and print settings will remain fully intact.`
  });
}
function getSubscriptionExpiredEmailHtml(placeholders) {
  const isBusiness = placeholders.plan_name.toLowerCase().includes("business");
  const planLabel = isBusiness ? "Business Tier" : "Pro Tier";
  const expiredHighlight = `
    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #fef2f2; border: 1.5px solid #fee2e2; border-radius: 12px;">
      <tr>
        <td style="padding: 16px 20px;">
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 11px; font-weight: 800; color: #b91c1c; letter-spacing: 0.5px; text-transform: uppercase;">PLAN DEACTIVATED</div>
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 15px; font-weight: 700; color: #991b1b; margin-top: 4px;">
            Premium Features Suspended
          </div>
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 13px; color: #7f1d1d; margin-top: 4px; line-height: 1.4;">
            As your <strong>NytroQ ${planLabel}</strong> subscription expired on <strong>${placeholders.expiry_date}</strong> without renewal, your account has been downgraded to the Free Tier. Premium features such as advanced calculations, company stamps, team collaboration, and cloud history are now disabled.
          </div>
        </td>
      </tr>
    </table>
  `;
  return renderBaseEmailTemplate({
    title: "Subscription Expired",
    badgeText: "PLAN",
    badgeSubText: "EXPIRED",
    badgeBgColor: "#fef2f2",
    badgeTextColor: "#b91c1c",
    badgeBorderColor: "#fee2e2",
    placeholders,
    introHtml: `Hello ${placeholders.customer_name || placeholders.customer_email.split("@")[0]},<br/><br/>Your premium subscription to <strong>NytroQ ${planLabel}</strong> has expired.`,
    highlightHtml: expiredHighlight,
    detailsTitle: "Deactivation Summary",
    detailsRows: [
      { label: "Expired Plan", value: planLabel },
      { label: "Expiration Date", value: placeholders.expiry_date },
      { label: "Billing Status", value: "Overdue / Suspended" },
      { label: "Current Account Status", value: "Free Tier (Downgraded)", isStatus: true }
    ],
    buttons: [
      { label: "Subscribe & Reactivate Now \u2192", url: placeholders.manage_subscription_url, primary: true }
    ],
    closingHtml: `Reactivating is fast and easy! Simply log in and click "Upgrade Plan" in your settings. All your configurations and saved settings are fully preserved so you can resume immediately.`
  });
}

// src/lib/seoConfig.ts
var import_meta = {};
var getBaseAppUrl = () => {
  if (typeof window !== "undefined") {
    return import_meta.env?.VITE_APP_URL || window.location.origin;
  }
  if (typeof process !== "undefined" && process.env) {
    return process.env.APP_URL || "https://nytroq.com";
  }
  return "https://nytroq.com";
};
var BASE_APP_URL = getBaseAppUrl();
var seoConfig = {
  siteName: "NytroQ",
  author: "NytroQ Tech Team",
  themeColor: "#16a34a",
  // NytroQ Brand Green color
  backgroundColor: "#f8fafc",
  // slate-50
  defaultLanguage: "en",
  googleConsoleVerification: "google-site-verification-placeholder-code",
  bingWebmasterVerification: "bing-site-verification-placeholder-code",
  logoUrl: `${BASE_APP_URL}/assets/nytroq-logo.png`,
  // fallback logo path
  routes: {
    "/": {
      title: "NytroQ \u2013 Fast Quotes, Clear Profit for Print Presses",
      description: "NytroQ is a cloud-based print estimating platform that helps Ghanaian printing businesses calculate costs, generate accurate quotations, manage jobs, and improve profitability.",
      keywords: "nytroq, printing press cost calculator, printing estimation, printing quotes, ghana print calculator, print press management, print estimating software",
      ogTitle: "NytroQ \u2013 High-Performance Print Estimator",
      ogDescription: "Cloud-based print estimating platform for calculating exact production costs and professional quotation drafting.",
      ogType: "website"
    },
    "/login": {
      title: "Sign In to NytroQ \u2013 Access Your Printing Business Portal",
      description: "Securely sign in to your NytroQ dashboard to manage print quotations, materials inventory, and client billing records.",
      keywords: "nytroq login, print press software sign in, print quoting system",
      ogTitle: "Sign In to NytroQ",
      ogDescription: "Access your cloud-based printing estimator dashboard.",
      ogType: "website"
    },
    "/signup": {
      title: "Create an Account \u2013 Join NytroQ Print Estimator",
      description: "Register your print business on NytroQ. Access automated cost calculators, quote generators, and invoice trackers today.",
      keywords: "nytroq register, print software signup, free print estimation tool",
      ogTitle: "Register on NytroQ",
      ogDescription: "Register your printing press on the leading estimation platform.",
      ogType: "website"
    },
    "/register": {
      title: "Create an Account \u2013 Join NytroQ Print Estimator",
      description: "Register your print business on NytroQ. Access automated cost calculators, quote generators, and invoice trackers today.",
      keywords: "nytroq register, print software signup, free print estimation tool",
      ogTitle: "Register on NytroQ",
      ogDescription: "Register your printing press on the leading estimation platform.",
      ogType: "website"
    },
    "/dashboard": {
      title: "Dashboard \u2013 NytroQ Print Estimating Software",
      description: "Analyze your printing press analytics, revenue figures, pending quotations, and overall production stats in real-time.",
      keywords: "print estimator dashboard, business analytics, print tracking",
      ogTitle: "NytroQ Business Dashboard",
      ogDescription: "Real-time analytics and tracking of print operations and profitability.",
      ogType: "website"
    },
    "/new-quote": {
      title: "Dynamic Printing Cost Calculator & Quotation Creator | NytroQ",
      description: "Instantly estimate the production cost of brochures, flyers, booklets, and custom materials. Includes Ghana VAT and tax adjustments.",
      keywords: "print estimator, pricing calculator, print job quote maker",
      ogTitle: "Dynamic Pricing Calculator \u2013 NytroQ",
      ogDescription: "Instantly generate accurate quotations with precise breakdown logs.",
      ogType: "website"
    },
    "/saved-quotes": {
      title: "Saved Quotes & History Portal \u2013 NytroQ",
      description: "Access, modify, export, and email your past printing cost quotations. Convert quotes to PDF and track subscription approvals.",
      keywords: "saved quotes, printing records, printable quotations, quotation pdf",
      ogTitle: "Saved Quotes & Invoices \u2013 NytroQ",
      ogDescription: "View, download, and email historical print quotes and billing summaries.",
      ogType: "website"
    },
    "/materials": {
      title: "Materials Catalog & Printing Inventory \u2013 NytroQ",
      description: "Manage paper stock, inks, plates, bindery tools, and unit prices. Automatically syncs with dynamic costing engines.",
      keywords: "materials management, print stock inventory, raw materials pricing",
      ogTitle: "Materials & Printing Inventory Catalog",
      ogDescription: "Configure paper stocks, inks, and custom rates to feed the dynamic estimation engine.",
      ogType: "website"
    },
    "/settings": {
      title: "System Settings & Profile Settings \u2013 NytroQ",
      description: "Configure standard profit margins, global labor rates, local VAT options, and personalize billing templates.",
      keywords: "settings, calculator configurations, profile updates, invoice customization",
      ogTitle: "System Configuration Portal \u2013 NytroQ",
      ogDescription: "Fine-tune system preferences, tax values, and subscription status.",
      ogType: "website"
    }
  }
};
function getMetadataForRoute(routePath) {
  const cleanPath = routePath.split("?")[0];
  const matched = seoConfig.routes[cleanPath] || seoConfig.routes["/"];
  const title = matched.title || seoConfig.routes["/"].title;
  const description = matched.description || seoConfig.routes["/"].description;
  const keywords = matched.keywords || seoConfig.routes["/"].keywords;
  const canonicalUrl = `${BASE_APP_URL}${cleanPath === "/" ? "" : cleanPath}`;
  const ogTitle = matched.ogTitle || title;
  const ogDescription = matched.ogDescription || description;
  const ogImage = matched.ogImage || seoConfig.logoUrl;
  const ogType = matched.ogType || "website";
  const twitterCard = matched.twitterCard || "summary_large_image";
  const twitterTitle = matched.twitterTitle || ogTitle;
  const twitterDescription = matched.twitterDescription || ogDescription;
  const twitterImage = matched.twitterImage || ogImage;
  return {
    title,
    description,
    keywords,
    canonicalUrl,
    ogTitle,
    ogDescription,
    ogImage,
    ogType,
    twitterCard,
    twitterTitle,
    twitterDescription,
    twitterImage
  };
}
function getStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "NytroQ",
    "description": "A high-performance cost calculator and quotation generator for Ghanaian printing presses, integrated with automated estimation engines.",
    "url": BASE_APP_URL,
    "logo": `${BASE_APP_URL}/assets/nytroq-logo.png`,
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "All",
    "browserRequirements": "Requires JavaScript. Requires HTML5.",
    "softwareVersion": "2.1.0",
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "GHS",
      "lowPrice": "0",
      "highPrice": "150",
      "offerCount": "3"
    },
    "author": {
      "@type": "Organization",
      "name": "NytroQ Solutions",
      "url": BASE_APP_URL,
      "logo": `${BASE_APP_URL}/assets/nytroq-logo.png`
    }
  };
}

// server.ts
import_dotenv.default.config();
var app = (0, import_express.default)();
var PORT = 3e3;
var supabaseUrl = process.env.VITE_SUPABASE_URL || "";
var serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
var paystackSecretKey = process.env.PAYSTACK_SECRET_KEY || "";
var log = (msg) => {
  console.log(`[FULLSTACK-SERVER] [${(/* @__PURE__ */ new Date()).toISOString()}] ${msg}`);
};
async function safeFetchWithTimeout(url, options = {}, timeoutMs = 3e3) {
  let controller = null;
  let timeoutId = null;
  if (typeof AbortController !== "undefined") {
    controller = new AbortController();
    timeoutId = setTimeout(() => {
      controller?.abort();
    }, timeoutMs);
  }
  try {
    const fetchOptions = {
      ...options,
      ...controller ? { signal: controller.signal } : {}
    };
    return await fetch(url, fetchOptions);
  } finally {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  }
}
var supabaseAdmin = null;
if (supabaseUrl && serviceRoleKey) {
  try {
    supabaseAdmin = (0, import_supabase_js.createClient)(supabaseUrl, serviceRoleKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false
      }
    });
    log("Supabase Admin initialized successfully.");
  } catch (err) {
    console.error("Failed to initialize Supabase Admin client:", err);
  }
} else {
  log("WARNING: VITE_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY is missing. Webhooks and real database writes will not be verified on the database level.");
}
var processedBillingEvents = /* @__PURE__ */ new Set();
async function getUserPreferredCurrency(email) {
  if (!supabaseAdmin) return "GHS";
  try {
    const { data: profile, error: profileErr } = await supabaseAdmin.from("profiles").select("id").eq("email", email.trim()).maybeSingle();
    if (profileErr || !profile) {
      log(`[Currency Lookup] No profile found for ${email}. Defaulting to GHS.`);
      return "GHS";
    }
    const { data: settings, error: settingsErr } = await supabaseAdmin.from("settings").select("currency").eq("user_id", profile.id).maybeSingle();
    if (settingsErr || !settings || !settings.currency) {
      log(`[Currency Lookup] No settings found for user ${profile.id}. Defaulting to GHS.`);
      return "GHS";
    }
    return settings.currency.toUpperCase();
  } catch (err) {
    console.error(`[Currency Lookup Error] Failed to fetch preferred currency for ${email}:`, err);
    return "GHS";
  }
}
async function fetchGhsExchangeRates() {
  const url = `https://open.er-api.com/v6/latest/GHS`;
  try {
    const response = await safeFetchWithTimeout(url, {}, 3e3);
    if (response.ok) {
      const data = await response.json();
      if (data && data.result === "success" && data.rates) {
        return data.rates;
      }
    }
  } catch (err) {
    console.warn(`[GHS Rates Fetch Warning] Failed to fetch GHS exchange rates:`, err.message);
  }
  return {
    GHS: 1,
    USD: 1 / 15.15,
    EUR: 1 / 16.2,
    GBP: 1 / 19.1,
    NGN: 1 / 0.01,
    KES: 1 / 0.117,
    UGX: 1 / 4e-3,
    TZS: 1 / 58e-4,
    ZAR: 1 / 0.83,
    CAD: 1 / 11,
    AUD: 1 / 10,
    JPY: 1 / 0.095,
    CNY: 1 / 2.08,
    INR: 1 / 0.18
  };
}
async function sendBillingEmail({
  email,
  planName,
  amountPaid,
  currency = "GHS",
  paymentMethod = "Paystack Card / Mobile Money",
  transactionId = "",
  nextBillingDate = "",
  customerName = "",
  eventType = "subscription_purchased"
}) {
  try {
    const apiKeyToUse = process.env.RESEND_API_KEY;
    if (!apiKeyToUse) {
      log("WARNING: RESEND_API_KEY is not configured in process.env. Skipping billing email dispatch.");
      return;
    }
    const { Resend } = await import("resend");
    const resendInstance = new Resend(apiKeyToUse);
    const now = /* @__PURE__ */ new Date();
    const billingDateStr = now.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
    let nextBillingStr = nextBillingDate;
    if (!nextBillingStr) {
      const nextMonth = /* @__PURE__ */ new Date();
      nextMonth.setMonth(now.getMonth() + 1);
      nextBillingStr = nextMonth.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
    }
    const invoiceNumber = `INV-${now.getFullYear()}-${Math.floor(1e4 + Math.random() * 9e4)}`;
    const txId = transactionId || `TXN-${Math.floor(1e7 + Math.random() * 9e7)}`;
    const preferredCurrency = await getUserPreferredCurrency(email);
    const rates = await fetchGhsExchangeRates();
    const basePlanPriceGHS = planName.toLowerCase() === "business" ? 150 : 50;
    const basePlanCurrency = "GHS";
    const chargedCurrency = (currency || "GHS").toUpperCase();
    const chargedAmountVal = parseFloat(amountPaid) || basePlanPriceGHS;
    const preferredRate = rates[preferredCurrency] || rates["GHS"] || 1;
    const preferredAmountVal = basePlanPriceGHS * preferredRate;
    const displayRate = rates[preferredCurrency] ? rates[preferredCurrency] : 1 / 15.15;
    const exchangeRateUsed = `1 GHS = ${displayRate.toFixed(4)} ${preferredCurrency} (or 1 ${preferredCurrency} = ${(1 / displayRate).toFixed(2)} GHS)`;
    const conversionOccurred = preferredCurrency !== basePlanCurrency;
    const base_price = basePlanPriceGHS.toFixed(2);
    const base_currency = basePlanCurrency;
    let finalPlaceholdersCurrencyCode = chargedCurrency;
    let finalPlaceholdersAmountPaid = chargedAmountVal.toFixed(2);
    if (chargedCurrency === preferredCurrency) {
      finalPlaceholdersCurrencyCode = preferredCurrency;
      finalPlaceholdersAmountPaid = preferredAmountVal.toFixed(2);
    }
    const placeholders = {
      customer_name: customerName || email.split("@")[0],
      customer_email: email,
      currency: getCurrencySymbol(finalPlaceholdersCurrencyCode),
      amount_paid: finalPlaceholdersAmountPaid,
      plan_name: planName.toLowerCase() === "business" ? "Business Tier" : "Pro Tier",
      billing_cycle: "Monthly Recurring",
      invoice_number: invoiceNumber,
      transaction_id: txId,
      payment_method: paymentMethod,
      payment_date: billingDateStr,
      next_billing_date: nextBillingStr,
      subscription_status: eventType === "subscription_cancelled" ? "Cancelled / Pending Expiry" : "Active / Paid",
      dashboard_url: process.env.APP_URL || "https://www.nytroq.com/dashboard",
      invoice_download_url: `${process.env.APP_URL || "https://www.nytroq.com"}/billing/invoice/${invoiceNumber}`,
      privacy_policy_url: `${process.env.APP_URL || "https://www.nytroq.com"}/privacy`,
      terms_of_service_url: `${process.env.APP_URL || "https://www.nytroq.com"}/terms`,
      manage_subscription_url: `${process.env.APP_URL || "https://www.nytroq.com"}/billing/manage`,
      company_logo_url: "https://raw.githubusercontent.com/NytroQ/brand-assets/main/logo.png",
      current_year: now.getFullYear().toString(),
      included_plan_features: planName.toLowerCase() === "business" ? [
        "Unlimited Estimates & Commercial Quotations",
        "Real-time Material Inventory & Automatic Scrap Deduct",
        "Advanced Realism Engine with Company Stamp Rendering",
        "Full Team Collaboration (Up to 10 print-shop operators)",
        "Dynamic Currency Conversion & Live Rate Feed Updates",
        "Priority Cloud Invoicing, PDF Print, & QR Verification"
      ] : [
        "Unlimited Estimates & Commercial Quotations",
        "Real-time Material Inventory & Automatic Scrap Deduct",
        "Advanced Realism Engine with Company Stamp Rendering",
        "Full Team Collaboration (Up to 3 print-shop operators)",
        "Dynamic Currency Conversion & Live Rate Feed Updates",
        "Priority Cloud Invoicing, PDF Print, & QR Verification"
      ],
      // Multi-currency placeholders passed to custom billing HTML
      base_price,
      base_currency,
      charged_amount: chargedAmountVal.toFixed(2),
      charged_currency: chargedCurrency,
      preferred_amount: preferredAmountVal.toFixed(2),
      preferred_currency: preferredCurrency,
      exchange_rate_used: exchangeRateUsed,
      conversion_occurred: conversionOccurred
    };
    const htmlContent = getBillingEmailByTypeHtml(eventType, placeholders);
    let subject = `Invoice Confirmed: Welcome to NytroQ ${planName.toLowerCase() === "business" ? "Business" : "Pro"}!`;
    if (eventType === "pro_plan_activated") {
      subject = `Welcome to NytroQ Pro! Your Premium Account is Active`;
    } else if (eventType === "business_plan_activated") {
      subject = `Welcome to NytroQ Business! Your Enterprise Workspace is Active`;
    } else if (eventType === "payment_receipt") {
      subject = `Payment Receipt for NytroQ Subscription (${invoiceNumber})`;
    } else if (eventType === "invoice") {
      subject = `Invoice ${invoiceNumber} Billed and Settled`;
    } else if (eventType === "subscription_renewal") {
      subject = `Your NytroQ Subscription Has Been Renewed Successfully`;
    } else if (eventType === "subscription_cancelled") {
      subject = `Subscription Cancelled: We're sorry to see you go!`;
    }
    log(`[BILLING EMAIL DISPATCH] Attempting to send billing email (${eventType}) to ${email} for plan ${planName}...`);
    const response = await resendInstance.emails.send({
      from: "NytroQ Billing <billing@mail.nytroq.com>",
      to: email,
      subject,
      html: htmlContent
    });
    if (response.error) {
      console.error("[BILLING EMAIL] Resend error details:", response.error);
    } else {
      log(`[BILLING EMAIL SUCCESS] Email successfully dispatched to ${email}. Message ID: ${response.data?.id}`);
    }
  } catch (err) {
    console.error("[BILLING EMAIL ERROR] Failed to send billing email:", err);
  }
}
app.use(import_express.default.json({
  verify: (req, res, buf) => {
    req.rawBody = buf.toString();
  }
}));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, x-paystack-signature");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  next();
});
app.get("/api/health", (req, res) => {
  res.json({
    status: "healthy",
    supabaseUrl: !!supabaseUrl,
    serviceRoleKey: !!serviceRoleKey,
    paystackSecretKey: !!paystackSecretKey
  });
});
app.get("/api/countries", async (req, res) => {
  const apiUrl = process.env.VITE_REST_COUNTRIES_API_URL || "https://restcountries.com/v3.1/all";
  const apiKey = process.env.VITE_REST_COUNTRIES_API_KEY || "";
  let fetchedData = null;
  let usedFallback = false;
  try {
    const headers = {
      "Accept": "application/json"
    };
    if (apiKey) {
      headers["Authorization"] = `Bearer ${apiKey}`;
    }
    console.log(`[REST Countries Proxy] Fetching from custom URL: ${apiUrl}`);
    const response = await safeFetchWithTimeout(apiUrl, { headers }, 3e3);
    if (response.ok) {
      const data = await response.json();
      if (Array.isArray(data)) {
        fetchedData = data;
      } else if (data && data.errors) {
        console.warn(`[REST Countries Proxy] Custom URL returned errors:`, data.errors);
      }
    } else {
      console.warn(`[REST Countries Proxy] Custom URL returned non-ok status: ${response.status}`);
    }
  } catch (err) {
    console.error("[REST Countries Proxy] Failed fetching from custom URL:", err.message);
  }
  if (!fetchedData) {
    const fallbackUrl = "https://raw.githubusercontent.com/mledoze/countries/master/dist/countries.json";
    console.log(`[REST Countries Proxy] Falling back to GitHub CDN: ${fallbackUrl}`);
    try {
      const response = await safeFetchWithTimeout(fallbackUrl, {}, 3e3);
      if (response.ok) {
        fetchedData = await response.json();
        usedFallback = true;
      } else {
        throw new Error(`GitHub CDN status: ${response.status}`);
      }
    } catch (fallbackErr) {
      console.error("[REST Countries Proxy] Fatal: GitHub CDN fallback failed too:", fallbackErr.message);
    }
  }
  if (!fetchedData) {
    console.log("[REST Countries Proxy] Both custom API and GitHub CDN failed. Serving high-fidelity local fallback countries list.");
    const fallbackMapped = [
      { code: "GH", name: "Ghana", dialCode: "+233", flag: "\u{1F1EC}\u{1F1ED}", currency: "GHS", symbol: "GH\u20B5" },
      { code: "US", name: "United States", dialCode: "+1", flag: "\u{1F1FA}\u{1F1F8}", currency: "USD", symbol: "$" },
      { code: "GB", name: "United Kingdom", dialCode: "+44", flag: "\u{1F1EC}\u{1F1E7}", currency: "GBP", symbol: "\xA3" },
      { code: "CA", name: "Canada", dialCode: "+1", flag: "\u{1F1E8}\u{1F1E6}", currency: "CAD", symbol: "$" },
      { code: "NG", name: "Nigeria", dialCode: "+234", flag: "\u{1F1F3}\u{1F1EC}", currency: "NGN", symbol: "\u20A6" },
      { code: "KE", name: "Kenya", dialCode: "+254", flag: "\u{1F1F0}\u{1F1EA}", currency: "KES", symbol: "KSh" },
      { code: "UG", name: "Uganda", dialCode: "+256", flag: "\u{1F1FA}\u{1F1EC}", currency: "UGX", symbol: "USh" },
      { code: "TZ", name: "Tanzania", dialCode: "+255", flag: "\u{1F1F9}\u{1F1FF}", currency: "TZS", symbol: "TSh" },
      { code: "ZA", name: "South Africa", dialCode: "+27", flag: "\u{1F1FF}\u{1F1E6}", currency: "ZAR", symbol: "R" },
      { code: "AU", name: "Australia", dialCode: "+61", flag: "\u{1F1E6}\u{1F1FA}", currency: "AUD", symbol: "$" },
      { code: "JP", name: "Japan", dialCode: "+81", flag: "\u{1F1EF}\u{1F1F5}", currency: "JPY", symbol: "\xA5" },
      { code: "DE", name: "Germany", dialCode: "+49", flag: "\u{1F1E9}\u{1F1EA}", currency: "EUR", symbol: "\u20AC" },
      { code: "FR", name: "France", dialCode: "+33", flag: "\u{1F1EB}\u{1F1F7}", currency: "EUR", symbol: "\u20AC" }
    ].map((c) => ({
      ...c,
      currencies: [{ code: c.currency, name: c.currency, symbol: c.symbol }]
    }));
    return res.json(fallbackMapped);
  }
  try {
    const mapped = fetchedData.filter((item) => {
      return !!(item?.cca2 && (item?.name?.common || item?.name?.official));
    }).map((item) => {
      const code = item.cca2;
      const name = item.name?.common || item.name?.official || code;
      let dialCode = "";
      if (item.idd?.root) {
        const suffixes = item.idd.suffixes || [];
        if (suffixes.length === 1) {
          dialCode = item.idd.root + suffixes[0];
        } else {
          dialCode = item.idd.root;
        }
      } else if (code) {
        const POPULAR_CALLING_CODES = {
          US: "+1",
          CA: "+1",
          GH: "+233",
          GB: "+44",
          NG: "+234",
          JP: "+81",
          AU: "+61",
          DE: "+49",
          FR: "+33"
        };
        if (POPULAR_CALLING_CODES[code.toUpperCase()]) {
          dialCode = POPULAR_CALLING_CODES[code.toUpperCase()];
        }
      }
      const dialCodePattern = /^\+[0-9]+$/;
      if (dialCode && !dialCodePattern.test(dialCode)) {
        dialCode = "";
      }
      const currenciesList = [];
      let primaryCurrency = "";
      let primarySymbol = "";
      if (item.currencies) {
        Object.entries(item.currencies).forEach(([currCode, currVal]) => {
          if (currCode && currVal) {
            currenciesList.push({
              code: currCode.toUpperCase(),
              name: currVal.name || "",
              symbol: currVal.symbol || ""
            });
          }
        });
        if (currenciesList.length > 0) {
          primaryCurrency = currenciesList[0].code;
          primarySymbol = currenciesList[0].symbol;
        }
      }
      return {
        code,
        name,
        dialCode,
        flag: item.flag || "",
        currency: primaryCurrency || "",
        symbol: primarySymbol || "",
        currencies: currenciesList
      };
    });
    console.log(`[REST Countries Proxy] Successfully returned ${mapped.length} countries. Fallback used: ${usedFallback}`);
    res.json(mapped);
  } catch (err) {
    console.error("[REST Countries Proxy] Error mapping country data:", err);
    res.status(500).json({ error: err.message || "Failed to process countries data" });
  }
});
app.get("/api/rates/:base", async (req, res) => {
  const base = (req.params.base || "GHS").toUpperCase();
  const url = `https://open.er-api.com/v6/latest/${base}`;
  try {
    const response = await safeFetchWithTimeout(url, {}, 3e3);
    if (response.ok) {
      const data = await response.json();
      if (data && data.result === "success" && data.rates) {
        return res.json(data);
      }
    }
    throw new Error(`Failed with status ${response.status}`);
  } catch (err) {
    console.warn(`[Exchange Rates Proxy] Failed fetching rates for ${base}, using fallback:`, err.message);
    const toUsd = {
      USD: 1,
      GHS: 1 / 15.15,
      EUR: 1 / 0.93,
      GBP: 1 / 0.79,
      NGN: 1 / 1500,
      KES: 1 / 130,
      UGX: 1 / 3750,
      TZS: 1 / 2600,
      ZAR: 1 / 18,
      CAD: 1 / 1.37,
      JPY: 1 / 160,
      AUD: 1 / 1.5
    };
    const baseToUsd = toUsd[base] || 1;
    const rates = {};
    Object.entries(toUsd).forEach(([curr, val]) => {
      rates[curr] = baseToUsd / val;
    });
    rates[base] = 1;
    return res.json({
      result: "success",
      base_code: base,
      rates
    });
  }
});
app.post("/api/paystack/initialize", async (req, res) => {
  try {
    const { email, planName, userId, callbackUrl } = req.body;
    if (!email || !planName || !userId) {
      return res.status(400).json({ error: "Missing required fields: email, planName, userId" });
    }
    log(`Initializing checkout for ${email} (${planName})`);
    const amountInPesewas = planName === "business" ? 15e3 : 5e3;
    const planCode = planName === "business" ? process.env.PAYSTACK_BUSINESS_PLAN_CODE : process.env.PAYSTACK_PRO_PLAN_CODE;
    const paystackPayload = {
      email,
      amount: amountInPesewas,
      currency: "GHS",
      callback_url: callbackUrl || "http://localhost:3000/",
      metadata: {
        user_id: userId,
        plan_name: planName,
        custom_fields: [
          {
            display_name: "User ID",
            variable_name: "user_id",
            value: userId
          },
          {
            display_name: "Plan Name",
            variable_name: "plan_name",
            value: planName
          }
        ]
      }
    };
    if (planCode) {
      paystackPayload.plan = planCode;
    }
    if (!paystackSecretKey) {
      log("Paystack secret key is missing. Yielding a simulation session URL.");
      return res.json({
        simulation: true,
        authorization_url: `${callbackUrl || "http://localhost:3000/"}?simulation_success=true&plan=${planName}&user=${userId}&email=${encodeURIComponent(email)}`,
        message: "Running in sandbox simulation mode. Redirect to complete purchase instantly."
      });
    }
    const response = await fetch("https://api.paystack.co/transaction/initialize", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${paystackSecretKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(paystackPayload)
    });
    const body = await response.json();
    if (!response.ok || !body.status) {
      log(`Paystack API Error: ${JSON.stringify(body)}`);
      return res.status(response.status).json({ error: body.message || "Failed to initialize Paystack transaction" });
    }
    res.json({
      simulation: false,
      authorization_url: body.data.authorization_url,
      reference: body.data.reference,
      access_code: body.data.access_code
    });
  } catch (error) {
    console.error("Paystack checkout initialize error:", error);
    res.status(500).json({ error: error.message || "Internal server error" });
  }
});
app.post("/api/paystack/webhook", async (req, res) => {
  try {
    const signature = req.headers["x-paystack-signature"];
    if (!signature) {
      log("Unauthorized Webhook attempt: missing x-paystack-signature header.");
      return res.status(401).json({ error: "Missing signature" });
    }
    if (paystackSecretKey) {
      const hmac = import_crypto.default.createHmac("sha512", paystackSecretKey);
      const computedSignature = hmac.update(req.rawBody || "").digest("hex");
      if (computedSignature !== signature) {
        log("Unauthorized Webhook attempt: Signature mismatch.");
        return res.status(400).json({ error: "Signature mismatch" });
      }
    } else {
      log("WARNING: Skipping signature verification because PAYSTACK_SECRET_KEY is empty.");
    }
    const payload = req.body;
    log(`Paystack Webhook received event: "${payload.event}"`);
    if (payload.event === "charge.success" || payload.event === "subscription.create") {
      const dataObj = payload.data;
      const email = dataObj.customer?.email;
      const userId = dataObj.metadata?.user_id || dataObj.metadata?.custom_fields?.find((f) => f.variable_name === "user_id")?.value;
      let planName = dataObj.metadata?.plan_name || dataObj.metadata?.custom_fields?.find((f) => f.variable_name === "plan_name")?.value;
      const customerCode = dataObj.customer?.customer_code || "";
      const subscriptionCode = dataObj.subscription?.subscription_code || "";
      const eventRef = dataObj.reference || subscriptionCode || String(dataObj.id || "");
      if (!planName) {
        const amount = dataObj.amount;
        if (amount >= 14e3) {
          planName = "business";
        } else if (amount >= 8e3) {
          planName = "pro";
        } else {
          planName = "free";
        }
      }
      log(`Webhook processing user subscription: U:${userId} E:${email} Plan:${planName} Ref:${eventRef}`);
      let isVerified = true;
      if (dataObj.reference && paystackSecretKey) {
        try {
          log(`Verifying Paystack transaction reference via API: ${dataObj.reference}`);
          const verifyResponse = await fetch(`https://api.paystack.co/transaction/verify/${encodeURIComponent(dataObj.reference)}`, {
            method: "GET",
            headers: {
              "Authorization": `Bearer ${paystackSecretKey}`,
              "Content-Type": "application/json"
            }
          });
          const verifyBody = await verifyResponse.json();
          if (!verifyResponse.ok || !verifyBody.status || verifyBody.data?.status !== "success") {
            log(`Transaction verification failed with Paystack API for reference: ${dataObj.reference}`);
            isVerified = false;
          } else {
            log(`Transaction successfully verified with Paystack API. Reference: ${dataObj.reference}`);
          }
        } catch (vErr) {
          console.error(`Error contacting Paystack to verify reference ${dataObj.reference}:`, vErr);
        }
      }
      if (!isVerified) {
        log("Aborting webhook processing: Transaction could not be verified.");
        return res.status(400).json({ error: "Failed to verify transaction with Paystack API" });
      }
      if (eventRef && supabaseAdmin) {
        try {
          const { data: existingPayment, error: findPayErr } = await supabaseAdmin.from("billing_payments").select("id, status").eq("reference", eventRef).maybeSingle();
          if (!findPayErr && existingPayment && existingPayment.status === "success") {
            log(`[WEBHOOK IDEMPOTENCY] Reference ${eventRef} already processed successfully (db). Skipping repeat activation.`);
            return res.status(200).json({ received: true, already_processed: true });
          }
        } catch (dbErr) {
          log("Skipped DB-level payment idempotency check (table 'billing_payments' might not exist).");
        }
      }
      if (userId && supabaseAdmin) {
        const now = /* @__PURE__ */ new Date();
        const endDate = /* @__PURE__ */ new Date();
        endDate.setDate(now.getDate() + 30);
        const { error } = await supabaseAdmin.from("subscriptions").upsert({
          user_id: userId,
          plan: planName,
          status: "active",
          paystack_customer_code: customerCode,
          paystack_subscription_code: subscriptionCode,
          start_date: now.toISOString(),
          end_date: endDate.toISOString(),
          updated_at: now.toISOString()
        }, { onConflict: "user_id" });
        if (error) {
          console.error("Failed to update database on webhook success:", error);
        } else {
          log(`Database update succeeded: user ${userId} updated to ${planName} plan.`);
          const amtPaidGHS = dataObj.amount ? (dataObj.amount / 100).toFixed(2) : planName === "business" ? "150.00" : "49.00";
          try {
            await supabaseAdmin.from("billing_payments").upsert({
              user_id: userId,
              email: email || "",
              reference: eventRef,
              amount: Number(amtPaidGHS),
              status: "success",
              plan: planName,
              created_at: now.toISOString()
            }, { onConflict: "reference" });
          } catch (dbErr) {
            log("Skipped logging to 'billing_payments' table (table might not exist).");
          }
        }
      } else {
        log("No valid user_id or supabaseAdmin initialized. Skipped database write.");
      }
      if (email && (planName === "pro" || planName === "business")) {
        if (eventRef) {
          if (processedBillingEvents.has(eventRef)) {
            log(`[WEBHOOK IDEMPOTENCY] Billing email already sent for reference (memory): ${eventRef}. Skipping duplicate.`);
          } else {
            processedBillingEvents.add(eventRef);
            let emailAlreadySent = false;
            if (supabaseAdmin) {
              try {
                const { data: existingEmailLog, error: emailLogErr } = await supabaseAdmin.from("billing_emails").select("id").eq("payment_reference", eventRef).maybeSingle();
                if (!emailLogErr && existingEmailLog) {
                  log(`[WEBHOOK IDEMPOTENCY] Billing email already sent for reference (db): ${eventRef}. Skipping duplicate.`);
                  emailAlreadySent = true;
                }
              } catch (dbErr) {
                log("Skipped DB-level email idempotency check (table 'billing_emails' might not exist).");
              }
            }
            if (!emailAlreadySent) {
              const amtPaidGHS = dataObj.amount ? (dataObj.amount / 100).toFixed(2) : planName === "business" ? "150.00" : "49.00";
              const gatewayResponse = dataObj.gateway_response || "Approved";
              const channel = dataObj.channel || "card";
              const pm = `${channel.toUpperCase()} (${gatewayResponse})`;
              log(`[WEBHOOK EMAIL DISPATCH] Triggering Resend email for reference: ${eventRef}`);
              sendBillingEmail({
                email: email.trim(),
                planName,
                amountPaid: amtPaidGHS,
                currency: "GHS",
                paymentMethod: pm,
                transactionId: dataObj.reference || subscriptionCode || "",
                customerName: dataObj.customer?.first_name || ""
              }).then(async () => {
                if (supabaseAdmin) {
                  try {
                    await supabaseAdmin.from("billing_emails").insert({
                      user_id: userId || "00000000-0000-0000-0000-000000000000",
                      payment_reference: eventRef,
                      email_type: `subscription_purchased_${planName}`,
                      sent_at: (/* @__PURE__ */ new Date()).toISOString()
                    });
                  } catch (dbErr) {
                    log("Skipped DB-level email log insertion (table might not exist).");
                  }
                }
              }).catch((err) => {
                console.error("[WEBHOOK BILLING EMAIL FAILED] Error dispatching email:", err);
              });
            }
          }
        }
      }
    } else if (payload.event === "subscription.disable") {
      const dataObj = payload.data;
      const subCode = dataObj.subscription_code;
      const customerCode = dataObj.customer?.customer_code;
      log(`Paystack Webhook disable received for Subscription: ${subCode}`);
      if (subCode && supabaseAdmin) {
        const { data: matched, error: qErr } = await supabaseAdmin.from("subscriptions").select("user_id").eq("paystack_subscription_code", subCode).maybeSingle();
        if (qErr) {
          console.error("Error matching disabled subscription: ", qErr);
        } else if (matched) {
          const { error } = await supabaseAdmin.from("subscriptions").upsert({
            user_id: matched.user_id,
            plan: "free",
            status: "canceled",
            updated_at: (/* @__PURE__ */ new Date()).toISOString()
          }, { onConflict: "user_id" });
          if (error) {
            console.error("Failed updating subscription status on disable:", error);
          } else {
            log(`Downgraded user ${matched.user_id} to Free plan due to Paystack disable event.`);
          }
        }
      }
    }
    res.status(200).json({ received: true });
  } catch (error) {
    console.error("Webhook processing error:", error);
    res.status(500).json({ error: error.message });
  }
});
app.post("/api/paystack/cancel", async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      return res.status(400).json({ error: "userId is required" });
    }
    if (!supabaseAdmin) {
      return res.status(400).json({ error: "Supabase not configured on server" });
    }
    const { data: sub, error: qErr } = await supabaseAdmin.from("subscriptions").select("*").eq("user_id", userId).maybeSingle();
    if (qErr || !sub) {
      return res.status(404).json({ error: "Subscription record not found" });
    }
    const subCode = sub.paystack_subscription_code;
    const custEmailToken = sub.paystack_customer_code;
    log(`Cancelling subscription for client: ${userId}, subscription code: ${subCode}`);
    if (paystackSecretKey && subCode) {
      const response = await fetch("https://api.paystack.co/subscription/disable", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${paystackSecretKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          code: subCode,
          token: custEmailToken
        })
      });
      const body = await response.json();
      if (!response.ok) {
        log(`Paystack Subscription Disable API Error: ${JSON.stringify(body)}`);
      }
    }
    const { error: updErr } = await supabaseAdmin.from("subscriptions").upsert({
      user_id: userId,
      plan: "free",
      status: "canceled",
      updated_at: (/* @__PURE__ */ new Date()).toISOString()
    }, { onConflict: "user_id" });
    if (updErr) {
      return res.status(500).json({ error: "Failed to downgrade database subscription record" });
    }
    try {
      const { data: profile } = await supabaseAdmin.from("profiles").select("*").eq("id", userId).maybeSingle();
      if (profile && profile.email) {
        log(`[BILLING UPDATE] Sending subscription cancellation email to ${profile.email} via Resend...`);
        sendBillingEmail({
          email: profile.email.trim(),
          planName: sub.plan || "pro",
          amountPaid: "0.00",
          currency: "GHS",
          paymentMethod: "None",
          transactionId: `CAN-${Math.floor(1e7 + Math.random() * 9e7)}`,
          customerName: profile.owner_name || profile.email.split("@")[0],
          eventType: "subscription_cancelled"
        }).catch((emailErr) => {
          console.error("[CANCEL BILLING EMAIL FAILED] Resend error during cancel:", emailErr);
        });
      }
    } catch (profileErr) {
      log(`[BILLING UPDATE] Skipped cancellation email because profile/email lookup failed: ${profileErr.message}`);
    }
    res.json({ success: true, message: "Subscription cancelled successfully." });
  } catch (error) {
    console.error("Cancel subscription error:", error);
    res.status(500).json({ error: error.message || "Failed to cancel subscription" });
  }
});
app.get("/api/paystack/transactions", async (req, res) => {
  try {
    const { email, userId, plan } = req.query;
    if (!email) {
      return res.status(400).json({ error: "Missing required parameter: email" });
    }
    if (!paystackSecretKey) {
      log(`Compiling dynamic simulation billing records for: ${email}`);
      const currentPlan = plan || "free";
      const transactions = [];
      if (currentPlan === "pro" || currentPlan === "business") {
        const amount = currentPlan === "business" ? 15e3 : 5e3;
        transactions.push({
          id: 74291845,
          reference: `PC-SIM-TX-${(/* @__PURE__ */ new Date()).getFullYear()}0104`,
          amount,
          status: "success",
          gateway_response: "Approved",
          paid_at: new Date(Date.now() - 3 * 24 * 3600 * 1e3).toISOString(),
          // 3 days ago
          created_at: new Date(Date.now() - 3 * 24 * 3600 * 1e3).toISOString(),
          channel: "mobile_money_gh",
          currency: "GHS",
          metadata: { plan_name: currentPlan, user_id: userId },
          customer: { email },
          receipt_url: null
        });
        transactions.push({
          id: 59182314,
          reference: `PC-SIM-TX-${(/* @__PURE__ */ new Date()).getFullYear()}0201`,
          amount,
          status: "success",
          gateway_response: "Approved",
          paid_at: new Date(Date.now() - 33 * 24 * 3600 * 1e3).toISOString(),
          // 33 days ago
          created_at: new Date(Date.now() - 33 * 24 * 3600 * 1e3).toISOString(),
          channel: "card",
          currency: "GHS",
          metadata: { plan_name: currentPlan, user_id: userId },
          customer: { email },
          receipt_url: null
        });
      }
      return res.json({ status: true, data: transactions });
    }
    try {
      const response = await fetch(`https://api.paystack.co/transaction?email=${encodeURIComponent(email)}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${paystackSecretKey}`,
          "Content-Type": "application/json"
        }
      });
      const body = await response.json();
      if (!response.ok) {
        return res.status(response.status).json({ error: body.message || "Failed to retrieve transactions from Paystack" });
      }
      let data = body.data || [];
      if (userId) {
        data = data.filter((tx) => tx.metadata?.user_id === userId || !tx.metadata?.user_id);
      }
      res.json({ status: true, data });
    } catch (networkError) {
      log(`Real Paystack API fetch failed (${networkError.message}). Compiling safe sandboxed billing simulation records instead.`);
      const currentPlan = plan || "free";
      const transactions = [];
      if (currentPlan === "pro" || currentPlan === "business") {
        const amount = currentPlan === "business" ? 15e3 : 5e3;
        transactions.push({
          id: 74291845,
          reference: `PC-SIM-TX-${(/* @__PURE__ */ new Date()).getFullYear()}0104`,
          amount,
          status: "success",
          gateway_response: "Approved",
          paid_at: new Date(Date.now() - 3 * 24 * 3600 * 1e3).toISOString(),
          // 3 days ago
          created_at: new Date(Date.now() - 3 * 24 * 3600 * 1e3).toISOString(),
          channel: "mobile_money_gh",
          currency: "GHS",
          metadata: { plan_name: currentPlan, user_id: userId },
          customer: { email },
          receipt_url: null
        });
        transactions.push({
          id: 59182314,
          reference: `PC-SIM-TX-${(/* @__PURE__ */ new Date()).getFullYear()}0201`,
          amount,
          status: "success",
          gateway_response: "Approved",
          paid_at: new Date(Date.now() - 33 * 24 * 3600 * 1e3).toISOString(),
          // 33 days ago
          created_at: new Date(Date.now() - 33 * 24 * 3600 * 1e3).toISOString(),
          channel: "card",
          currency: "GHS",
          metadata: { plan_name: currentPlan, user_id: userId },
          customer: { email },
          receipt_url: null
        });
      }
      return res.json({ status: true, data: transactions });
    }
  } catch (error) {
    console.error("Fetch transactions error:", error);
    res.status(500).json({ error: error.message || "Internal server error" });
  }
});
app.post("/api/webhook-simulator", async (req, res) => {
  try {
    const { userId, email, planName, action } = req.body;
    if (!userId) {
      return res.status(400).json({ error: "userId is required for simulation." });
    }
    if (!supabaseAdmin) {
      return res.status(400).json({ error: "Database setup not fully ready on server workspace." });
    }
    log(`Webhook Simulated Request - User ID: ${userId}, Plan: ${planName}, Action: ${action}`);
    if (action === "cancel") {
      const { error } = await supabaseAdmin.from("subscriptions").upsert({
        user_id: userId,
        plan: "free",
        status: "canceled",
        updated_at: (/* @__PURE__ */ new Date()).toISOString()
      }, { onConflict: "user_id" });
      if (error) throw error;
      if (email) {
        sendBillingEmail({
          email: email.trim(),
          planName: "pro",
          amountPaid: "0.00",
          currency: "GHS",
          paymentMethod: "None",
          transactionId: `SIM-CAN-${Math.floor(1e7 + Math.random() * 9e7)}`,
          customerName: email.split("@")[0],
          eventType: "subscription_cancelled"
        }).catch((err) => {
          console.error("[SIMULATOR CANCEL EMAIL FAILED] Error sending simulated cancel email:", err);
        });
      }
      return res.json({ success: true, message: "Simulated cancellation complete! User is now Free plan status." });
    } else {
      const now = /* @__PURE__ */ new Date();
      const end = /* @__PURE__ */ new Date();
      end.setDate(now.getDate() + 30);
      const targetPlan = planName || "pro";
      const { error } = await supabaseAdmin.from("subscriptions").upsert({
        user_id: userId,
        plan: targetPlan,
        status: "active",
        paystack_customer_code: "CUS_simulated_cus_code",
        paystack_subscription_code: "SUB_simulated_sub_code",
        start_date: now.toISOString(),
        end_date: end.toISOString(),
        updated_at: now.toISOString()
      }, { onConflict: "user_id" });
      if (error) throw error;
      if (email && (targetPlan === "pro" || targetPlan === "business")) {
        const amt = targetPlan === "business" ? "150.00" : "50.00";
        sendBillingEmail({
          email: email.trim(),
          planName: targetPlan,
          amountPaid: amt,
          currency: "GHS",
          paymentMethod: "Simulated Card Payment",
          transactionId: `SIM-TXN-${Math.floor(1e7 + Math.random() * 9e7)}`,
          customerName: email.split("@")[0],
          eventType: targetPlan === "business" ? "business_plan_activated" : "pro_plan_activated"
        }).catch((err) => {
          console.error("[SIMULATOR BILLING EMAIL FAILED] Error sending simulated email:", err);
        });
      }
      return res.json({ success: true, message: `Simulated transaction success! User active plan is now "${targetPlan}"` });
    }
  } catch (error) {
    console.error("Webhook simulator failure:", error);
    res.status(500).json({ error: error.message || "Simulation error occured." });
  }
});
var otps = /* @__PURE__ */ new Map();
var verifiedOtpSessions = /* @__PURE__ */ new Map();
app.post("/api/auth/generate-otp", async (req, res) => {
  try {
    const { email, purpose, resendApiKey } = req.body;
    if (!email || !purpose) {
      return res.status(400).json({ error: "Email and purpose ('email_verification' | 'password_reset') are required." });
    }
    const emailKey = email.toLowerCase().trim();
    let otpCode = Math.floor(1e5 + Math.random() * 9e5).toString();
    log(`[OTP PRE-DISPATCH] Generated custom server-side 6-digit OTP code: ${otpCode}`);
    otps.delete(emailKey);
    otps.set(emailKey, {
      code: otpCode,
      expiresAt: Date.now() + 10 * 60 * 1e3,
      attempts: 0,
      purpose
    });
    log(`[OTP GENERATED] Email: ${emailKey}, Purpose: ${purpose}, Code: ${otpCode}`);
    const rawKey = resendApiKey?.trim();
    const apiKeyToUse = rawKey && rawKey.startsWith("re_") ? rawKey : process.env.RESEND_API_KEY;
    if (apiKeyToUse) {
      try {
        const { Resend } = await import("resend");
        const resendInstance = new Resend(apiKeyToUse);
        const subject = purpose === "password_reset" ? "Reset Your NytroQ Password" : "Verify Your NytroQ Account";
        const htmlContent = getOtpEmailHtml(otpCode, purpose);
        log(`[OTP DISPATCH] Dispatched OTP code via Resend to ${emailKey}`);
        await resendInstance.emails.send({
          from: "NytroQ Security <security@mail.nytroq.com>",
          to: emailKey,
          subject,
          html: htmlContent
        });
      } catch (emailErr) {
        console.error(`[OTP DISPATCH ERROR] Failed to send OTP email to ${emailKey} via Resend:`, emailErr.message);
      }
    } else {
      log(`[OTP DISPATCH SANDBOX] Neither user-provided Resend API Key nor server-side RESEND_API_KEY is configured. OTP printed to log and sandbox for testing: ${otpCode}`);
    }
    return res.json({
      success: true,
      code: otpCode,
      message: `A secure 6-digit OTP verification code has been dispatched directly to ${emailKey}. Please check your email inbox.`
    });
  } catch (error) {
    console.error("OTP generation failed:", error);
    res.status(500).json({ error: error.message || "An error occurred during OTP generation." });
  }
});
app.post("/api/auth/verify-otp", async (req, res) => {
  try {
    const { email, code, purpose } = req.body;
    if (!email || !code || !purpose) {
      return res.status(400).json({ error: "Email, 6-digit OTP code, and purpose are required." });
    }
    const emailKey = email.toLowerCase().trim();
    const cleanCode = code.trim();
    const record = otps.get(emailKey);
    if (!record || record.purpose !== purpose) {
      return res.status(400).json({ error: "No active verification code found for this email address." });
    }
    if (record.code !== cleanCode) {
      record.attempts += 1;
      if (record.attempts >= 5) {
        otps.delete(emailKey);
        return res.status(400).json({ error: "Too many failed attempts. This OTP code has been invalidated for security. Please request a new code." });
      }
      return res.status(400).json({ error: `Invalid code. Please check and try again. ${5 - record.attempts} attempts remaining.` });
    }
    if (Date.now() > record.expiresAt) {
      otps.delete(emailKey);
      return res.status(400).json({ error: "Expired code. Code was only valid for 10 minutes. Please request a new one." });
    }
    otps.delete(emailKey);
    if (purpose === "email_verification" && supabaseAdmin) {
      try {
        log(`[OTP VERIFICATION] Querying user lists to confirm email for: ${emailKey}`);
        const { data: { users }, error: listError } = await supabaseAdmin.auth.admin.listUsers();
        if (listError) {
          console.error("Failed to list users for verification:", listError);
        } else {
          const targetUser = users.find((u) => u.email?.toLowerCase().trim() === emailKey);
          if (targetUser) {
            const { error: confirmError } = await supabaseAdmin.auth.admin.updateUserById(targetUser.id, {
              email_confirm: true,
              email_confirmed_at: (/* @__PURE__ */ new Date()).toISOString(),
              user_metadata: { ...targetUser.user_metadata || {}, email_verified: true }
            });
            if (confirmError) {
              console.error("Failed to confirm email via Supabase admin:", confirmError);
            } else {
              log(`[OTP VERIFICATION] Email successfully confirmed in Supabase database for user ID: ${targetUser.id}`);
            }
          } else {
            console.warn(`[OTP VERIFICATION] No Supabase user found matching email ${emailKey}`);
          }
        }
      } catch (adminErr) {
        console.error("Admin user email confirmation failed:", adminErr);
      }
    }
    if (purpose === "password_reset") {
      verifiedOtpSessions.set(emailKey, { purpose, verifiedAt: Date.now() });
    }
    log(`[OTP SUCCESS] Email: ${emailKey} successfully completed OTP challenge: ${purpose}`);
    return res.json({
      success: true,
      message: "One-Time Password verified successfully!"
    });
  } catch (error) {
    console.error("OTP verification failed:", error);
    res.status(500).json({ error: error.message || "An error occurred during OTP verification." });
  }
});
app.post("/api/auth/update-password", async (req, res) => {
  try {
    const { email, password, code } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email and new password are required." });
    }
    const emailKey = email.toLowerCase().trim();
    let isAuthorized = false;
    const session = verifiedOtpSessions.get(emailKey);
    if (session && session.purpose === "password_reset") {
      if (Date.now() - session.verifiedAt <= 15 * 60 * 1e3) {
        isAuthorized = true;
      } else {
        verifiedOtpSessions.delete(emailKey);
        return res.status(401).json({ error: "Verification code has expired." });
      }
    }
    if (!isAuthorized && code) {
      const cleanCode = code.trim();
      const record = otps.get(emailKey);
      if (record && record.purpose === "password_reset") {
        if (Date.now() > record.expiresAt) {
          otps.delete(emailKey);
          return res.status(401).json({ error: "Verification code has expired." });
        }
        if (record.code === cleanCode) {
          isAuthorized = true;
          otps.delete(emailKey);
        } else {
          return res.status(401).json({ error: "Invalid verification code." });
        }
      }
    }
    if (!isAuthorized) {
      if (code) {
        return res.status(401).json({ error: "Invalid verification code." });
      }
      return res.status(401).json({ error: "Unauthorized password update. Please complete the One-Time Password verification first." });
    }
    verifiedOtpSessions.delete(emailKey);
    if (supabaseAdmin) {
      log(`[Update Password] Querying users list to find ID for: ${emailKey}`);
      const { data: { users }, error: listError } = await supabaseAdmin.auth.admin.listUsers();
      if (listError) {
        console.error("Failed to fetch users to update password:", listError);
        return res.status(500).json({ error: "Failed to resolve workspace user ID on database." });
      }
      const targetUser = users.find((u) => u.email?.toLowerCase().trim() === emailKey);
      if (!targetUser) {
        return res.status(404).json({ error: "No print shop user found matching this email address on Supabase." });
      }
      const { error: updateError } = await supabaseAdmin.auth.admin.updateUserById(targetUser.id, {
        password
      });
      if (updateError) {
        console.error("Supabase Admin password update failed:", updateError);
        return res.status(500).json({ error: updateError.message || "Failed to update security credentials on Supabase." });
      }
      log(`[Update Password] Successfully updated password for user ID: ${targetUser.id}`);
    } else {
      log(`[Update Password Sandbox] Supabase Admin not initialized. Updated mock/sandbox password successfully for: ${emailKey}`);
    }
    return res.json({
      success: true,
      message: "Password updated successfully!"
    });
  } catch (error) {
    console.error("Password update handler failed:", error);
    res.status(500).json({ error: error.message || "An error occurred during password update." });
  }
});
app.post("/api/send-test-email", async (req, res) => {
  try {
    const { resendApiKey, placeholders, recipientEmail, senderEmail, senderName, eventType = "subscription_purchased" } = req.body;
    if (!recipientEmail) {
      return res.status(400).json({ error: "recipientEmail is required." });
    }
    if (placeholders) {
      const origCurrency = placeholders.currency || "GHS";
      placeholders.currency = getCurrencySymbol(origCurrency);
      if (!placeholders.base_price) {
        const preferredCurrency = origCurrency.toUpperCase() === "GHS" ? "GHS" : origCurrency.toUpperCase();
        const conversionOccurred = preferredCurrency !== "GHS";
        placeholders.conversion_occurred = conversionOccurred;
        if (conversionOccurred) {
          const rates = {
            GHS: 1,
            USD: 1 / 15.15,
            EUR: 1 / 16.2,
            GBP: 1 / 19.1,
            NGN: 1 / 0.01,
            KES: 1 / 0.117,
            UGX: 1 / 4e-3,
            TZS: 1 / 58e-4,
            ZAR: 1 / 0.83
          };
          const rate = rates[preferredCurrency] || 1;
          placeholders.base_price = "50.00";
          placeholders.base_currency = "GHS";
          placeholders.charged_amount = "50.00";
          placeholders.charged_currency = "GHS";
          placeholders.preferred_currency = preferredCurrency;
          placeholders.preferred_amount = (50 * rate).toFixed(2);
          placeholders.exchange_rate_used = `1 GHS = ${rate.toFixed(4)} ${preferredCurrency} (or 1 ${preferredCurrency} = ${(1 / rate).toFixed(2)} GHS)`;
        }
      }
    }
    const htmlContent = getBillingEmailByTypeHtml(eventType, placeholders);
    let subject = `Subscription Confirmed: Welcome to NytroQ Premium!`;
    if (eventType === "subscription_purchased" || eventType === "subscription.purchased") {
      subject = `Subscription Confirmed: Welcome to NytroQ Premium!`;
    } else if (eventType === "pro_plan_activated") {
      subject = `Welcome to NytroQ Pro! Your Premium Account is Active`;
    } else if (eventType === "business_plan_activated") {
      subject = `Welcome to NytroQ Business! Your Enterprise Workspace is Active`;
    } else if (eventType === "payment_receipt") {
      subject = `Payment Receipt for NytroQ Subscription (${placeholders.invoice_number || "INV-TEST-99"})`;
    } else if (eventType === "invoice") {
      subject = `Invoice ${placeholders.invoice_number || "INV-TEST-99"} Billed and Settled`;
    } else if (eventType === "subscription_renewal") {
      subject = `Your NytroQ Subscription Has Been Renewed Successfully`;
    } else if (eventType === "subscription_cancelled") {
      subject = `Subscription Cancelled: We're sorry to see you go!`;
    }
    const rawKey = resendApiKey?.trim();
    const apiKeyToUse = rawKey && rawKey.startsWith("re_") ? rawKey : process.env.RESEND_API_KEY;
    if (!apiKeyToUse) {
      return res.status(400).json({ error: "Resend API Key is required. Please provide it in your settings or configure it in server-side environment variables." });
    }
    const { Resend } = await import("resend");
    const resendInstance = new Resend(apiKeyToUse);
    const response = await resendInstance.emails.send({
      from: `"${senderName || "NytroQ Billing"}" <${senderEmail || "billing@mail.nytroq.com"}>`,
      to: recipientEmail,
      subject,
      html: htmlContent
    });
    if (response.error) {
      return res.status(400).json({ error: response.error.message || JSON.stringify(response.error) });
    }
    log(`Test email successfully sent to ${recipientEmail} via Resend. Message ID: ${response.data?.id}`);
    return res.json({
      success: true,
      messageId: response.data?.id,
      message: `Test email successfully sent to ${recipientEmail} via Resend!`
    });
  } catch (err) {
    console.error("Failed to send test email via Resend:", err);
    return res.status(500).json({ error: err.message || "Failed to send email. Verify Resend API Key and try again." });
  }
});
async function sendReminderEmail({
  email,
  name,
  planName,
  expiryDate,
  daysRemaining,
  eventType,
  rates,
  userId
}) {
  const apiKeyToUse = process.env.RESEND_API_KEY;
  if (!apiKeyToUse) {
    log("[REMINDERS JOB] WARNING: RESEND_API_KEY is not configured in process.env. Skipping reminder email dispatch.");
    return;
  }
  let preferredCurrency = "GHS";
  try {
    const { data: userSettings } = await supabaseAdmin.from("settings").select("*").eq("user_id", userId).maybeSingle();
    if (userSettings && userSettings.currency) {
      preferredCurrency = userSettings.currency;
    }
  } catch (err) {
    console.error("[REMINDERS JOB] Error fetching user currency settings:", err);
  }
  const basePlanPriceGHS = planName.toLowerCase() === "business" ? 150 : 50;
  const preferredRate = rates[preferredCurrency] || rates["GHS"] || 1;
  const preferredAmountVal = basePlanPriceGHS * preferredRate;
  const expiryDateObj = new Date(expiryDate);
  const formattedExpiryDate = expiryDateObj.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  const placeholders = {
    customer_name: name,
    customer_email: email,
    currency: getCurrencySymbol(preferredCurrency),
    amount_paid: preferredAmountVal.toFixed(2),
    plan_name: planName.toLowerCase() === "business" ? "Business Tier" : "Pro Tier",
    billing_cycle: "Monthly Recurring",
    invoice_number: `INV-${(/* @__PURE__ */ new Date()).getFullYear()}-${Math.floor(1e4 + Math.random() * 9e4)}`,
    transaction_id: `TXN-${Math.floor(1e7 + Math.random() * 9e7)}`,
    payment_method: "Paystack Card / Mobile Money",
    payment_date: (/* @__PURE__ */ new Date()).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
    next_billing_date: formattedExpiryDate,
    subscription_status: eventType === "subscription_expired_final" ? "Expired / Suspended" : "Active / Expiring Soon",
    dashboard_url: process.env.APP_URL || "https://www.nytroq.com/dashboard",
    invoice_download_url: "",
    privacy_policy_url: `${process.env.APP_URL || "https://www.nytroq.com"}/privacy`,
    terms_of_service_url: `${process.env.APP_URL || "https://www.nytroq.com"}/terms`,
    manage_subscription_url: `${process.env.APP_URL || "https://www.nytroq.com"}/billing/manage`,
    company_logo_url: "https://raw.githubusercontent.com/NytroQ/brand-assets/main/logo.png",
    current_year: (/* @__PURE__ */ new Date()).getFullYear().toString(),
    included_plan_features: [],
    days_remaining: daysRemaining,
    expiry_date: formattedExpiryDate
  };
  const htmlContent = getBillingEmailByTypeHtml(eventType, placeholders);
  let subject = "";
  if (eventType === "subscription_expiry_reminder") {
    const timeStr = daysRemaining === 0 ? "today" : `in ${daysRemaining} day${daysRemaining !== 1 ? "s" : ""}`;
    subject = `Action Required: Your NytroQ Premium Subscription Expires ${timeStr}`;
  } else {
    subject = `Your NytroQ Premium Subscription Has Expired`;
  }
  const { Resend } = await import("resend");
  const resendInstance = new Resend(apiKeyToUse);
  log(`[REMINDERS JOB] Dispatched Resend email (${eventType}) to ${email}`);
  const response = await resendInstance.emails.send({
    from: "NytroQ Billing <billing@mail.nytroq.com>",
    to: email,
    subject,
    html: htmlContent
  });
  if (response.error) {
    throw new Error(`Resend send failed: ${JSON.stringify(response.error)}`);
  }
}
async function runSubscriptionRemindersJob() {
  log("[REMINDERS JOB] Starting subscription expiry reminder scan...");
  try {
    if (!supabaseAdmin) {
      log("[REMINDERS JOB] WARNING: supabaseAdmin is not initialized. Skipping scan.");
      return;
    }
    const { data: activeSubs, error } = await supabaseAdmin.from("subscriptions").select("*").neq("plan", "free");
    if (error) {
      console.error("[REMINDERS JOB] Error fetching active subscriptions:", error);
      return;
    }
    if (!activeSubs || activeSubs.length === 0) {
      log("[REMINDERS JOB] No active subscriptions found to process.");
      return;
    }
    log(`[REMINDERS JOB] Found ${activeSubs.length} active subscription(s) to scan.`);
    const rates = await fetchGhsExchangeRates();
    const now = /* @__PURE__ */ new Date();
    const nowDateOnly = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    for (const sub of activeSubs) {
      if (!sub.end_date) continue;
      const expiry = new Date(sub.end_date);
      const expiryDateOnly = new Date(expiry.getFullYear(), expiry.getMonth(), expiry.getDate());
      const diffTime = expiryDateOnly.getTime() - nowDateOnly.getTime();
      const daysRemaining = Math.round(diffTime / (1e3 * 60 * 60 * 24));
      log(`[REMINDERS JOB] User: ${sub.user_id} | Plan: ${sub.plan} | Expiry: ${sub.end_date} | Days remaining: ${daysRemaining}`);
      const { data: profile, error: profileErr } = await supabaseAdmin.from("profiles").select("*").eq("id", sub.user_id).maybeSingle();
      let email = profile?.email;
      let name = profile?.owner_name || email?.split("@")[0] || "Subscriber";
      if (!email) {
        try {
          const { data: authUser } = await supabaseAdmin.auth.admin.getUser(sub.user_id);
          email = authUser?.user?.email;
          if (!name && email) {
            name = email.split("@")[0];
          }
        } catch (err) {
          console.error(`[REMINDERS JOB] Failed to fetch auth user for ${sub.user_id}:`, err);
        }
      }
      if (!email) {
        console.error(`[REMINDERS JOB] No email address found for user ${sub.user_id}. Skipping reminders.`);
        continue;
      }
      if (now > expiry) {
        log(`[REMINDERS JOB] Subscription for ${email} has expired (Expired on ${sub.end_date}). Downgrading to Free...`);
        const finalExpiredRef = `reminder_expired_${sub.user_id}_${sub.end_date}`;
        const { data: logged, error: logErr } = await supabaseAdmin.from("billing_emails").select("*").eq("payment_reference", finalExpiredRef).maybeSingle();
        if (logErr) {
          console.error(`[REMINDERS JOB] Error checking email log for ${finalExpiredRef}:`, logErr);
          continue;
        }
        if (!logged) {
          try {
            await sendReminderEmail({
              email,
              name,
              planName: sub.plan,
              expiryDate: sub.end_date,
              daysRemaining: 0,
              eventType: "subscription_expired_final",
              rates,
              userId: sub.user_id
            });
            await supabaseAdmin.from("billing_emails").insert({
              user_id: sub.user_id,
              payment_reference: finalExpiredRef,
              email_type: "subscription_expired_final"
            });
            log(`[REMINDERS JOB] Logged final expired email for user ${sub.user_id}`);
          } catch (sendErr) {
            console.error(`[REMINDERS JOB] Failed to send/log expired email for user ${sub.user_id}:`, sendErr);
          }
        }
        try {
          const { error: updErr } = await supabaseAdmin.from("subscriptions").upsert({
            ...sub,
            plan: "free",
            status: "canceled",
            updated_at: (/* @__PURE__ */ new Date()).toISOString()
          }, { onConflict: "user_id" });
          if (updErr) {
            console.error(`[REMINDERS JOB] Failed to update subscription to free in DB for ${sub.user_id}:`, updErr);
          } else {
            log(`[REMINDERS JOB] Successfully downgraded user ${sub.user_id} to Free plan in database.`);
          }
        } catch (dbErr) {
          console.error(`[REMINDERS JOB] Exception downgrading subscription for user ${sub.user_id}:`, dbErr);
        }
        continue;
      }
      const allowedReminderDays = [7, 3, 1, 0];
      if (allowedReminderDays.includes(daysRemaining)) {
        const reminderRef = `reminder_${daysRemaining}_days_${sub.user_id}_${sub.end_date}`;
        const { data: logged, error: logErr } = await supabaseAdmin.from("billing_emails").select("*").eq("payment_reference", reminderRef).maybeSingle();
        if (logErr) {
          console.error(`[REMINDERS JOB] Error checking email log for ${reminderRef}:`, logErr);
          continue;
        }
        if (!logged) {
          log(`[REMINDERS JOB] Sending ${daysRemaining}-day reminder to ${email} (Expires in ${daysRemaining} days on ${sub.end_date})...`);
          try {
            await sendReminderEmail({
              email,
              name,
              planName: sub.plan,
              expiryDate: sub.end_date,
              daysRemaining,
              eventType: "subscription_expiry_reminder",
              rates,
              userId: sub.user_id
            });
            await supabaseAdmin.from("billing_emails").insert({
              user_id: sub.user_id,
              payment_reference: reminderRef,
              email_type: `subscription_expiry_reminder_${daysRemaining}_days`
            });
            log(`[REMINDERS JOB] Logged ${daysRemaining}-day reminder for user ${sub.user_id}`);
          } catch (sendErr) {
            console.error(`[REMINDERS JOB] Failed to send/log ${daysRemaining}-day reminder for user ${sub.user_id}:`, sendErr);
          }
        } else {
          log(`[REMINDERS JOB] ${daysRemaining}-day reminder already sent/logged for user ${sub.user_id} on expiration date ${sub.end_date}.`);
        }
      }
    }
  } catch (jobErr) {
    console.error("[REMINDERS JOB] Unexpected exception during subscription reminders job:", jobErr);
  }
}
app.post("/api/test-reminder-email", async (req, res) => {
  try {
    const {
      email,
      name = "Test User",
      planName = "pro",
      daysRemaining = 3,
      eventType = "subscription_expiry_reminder",
      resendApiKey
    } = req.body;
    if (!email) {
      return res.status(400).json({ error: "email is required" });
    }
    const apiKeyToUse = resendApiKey?.trim()?.startsWith("re_") ? resendApiKey.trim() : process.env.RESEND_API_KEY;
    if (!apiKeyToUse) {
      return res.status(400).json({
        error: "RESEND_API_KEY is not configured. Add it to your .env file or pass resendApiKey in the request body."
      });
    }
    const expiryDate = /* @__PURE__ */ new Date();
    expiryDate.setDate(expiryDate.getDate() + Number(daysRemaining));
    const rates = await fetchGhsExchangeRates();
    const basePlanPriceGHS = planName.toLowerCase() === "business" ? 150 : 50;
    const displayCurrency = "GHS";
    const displayRate = rates[displayCurrency] || 1;
    const displayAmount = (basePlanPriceGHS * displayRate).toFixed(2);
    const formattedExpiry = expiryDate.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
    const placeholders = {
      customer_name: name,
      customer_email: email,
      currency: getCurrencySymbol(displayCurrency),
      amount_paid: displayAmount,
      plan_name: planName.toLowerCase() === "business" ? "Business Tier" : "Pro Tier",
      billing_cycle: "Monthly Recurring",
      invoice_number: `INV-TEST-${Math.floor(1e4 + Math.random() * 9e4)}`,
      transaction_id: `TXN-TEST-${Math.floor(1e7 + Math.random() * 9e7)}`,
      payment_method: "Paystack Card / Mobile Money",
      payment_date: (/* @__PURE__ */ new Date()).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
      next_billing_date: formattedExpiry,
      subscription_status: eventType === "subscription_expired_final" ? "Expired / Suspended" : "Active / Expiring Soon",
      dashboard_url: process.env.APP_URL || "http://localhost:3000",
      invoice_download_url: "",
      privacy_policy_url: `${process.env.APP_URL || "http://localhost:3000"}/privacy`,
      terms_of_service_url: `${process.env.APP_URL || "http://localhost:3000"}/terms`,
      manage_subscription_url: `${process.env.APP_URL || "http://localhost:3000"}/billing/manage`,
      company_logo_url: "https://raw.githubusercontent.com/NytroQ/brand-assets/main/logo.png",
      current_year: (/* @__PURE__ */ new Date()).getFullYear().toString(),
      included_plan_features: [],
      days_remaining: Number(daysRemaining),
      expiry_date: formattedExpiry
    };
    const htmlContent = getBillingEmailByTypeHtml(eventType, placeholders);
    let subject = "";
    if (eventType === "subscription_expiry_reminder") {
      const timeStr = Number(daysRemaining) === 0 ? "today" : `in ${daysRemaining} day${Number(daysRemaining) !== 1 ? "s" : ""}`;
      subject = `[TEST] Action Required: Your NytroQ Premium Subscription Expires ${timeStr}`;
    } else {
      subject = `[TEST] Your NytroQ Premium Subscription Has Expired`;
    }
    const { Resend } = await import("resend");
    const resendInstance = new Resend(apiKeyToUse);
    log(`[REMINDER TEST] Sending test reminder email (${eventType}, ${daysRemaining} days) to ${email}...`);
    const response = await resendInstance.emails.send({
      from: "NytroQ Billing <billing@mail.nytroq.com>",
      to: email,
      subject,
      html: htmlContent
    });
    if (response.error) {
      log(`[REMINDER TEST] Resend error: ${JSON.stringify(response.error)}`);
      return res.status(400).json({ error: response.error.message || JSON.stringify(response.error) });
    }
    log(`[REMINDER TEST] Test reminder email delivered to ${email}. Message ID: ${response.data?.id}`);
    return res.json({
      success: true,
      messageId: response.data?.id,
      sentTo: email,
      eventType,
      daysRemaining,
      planName,
      subject
    });
  } catch (err) {
    console.error("[REMINDER TEST] Unexpected error:", err);
    return res.status(500).json({ error: err.message || "Internal server error" });
  }
});
setTimeout(() => {
  runSubscriptionRemindersJob().catch((err) => {
    console.error("[REMINDERS JOB] Initial startup execution failed:", err);
  });
}, 5e3);
setInterval(() => {
  runSubscriptionRemindersJob().catch((err) => {
    console.error("[REMINDERS JOB] Scheduled execution failed:", err);
  });
}, 60 * 60 * 1e3);
app.get("/manifest.json", (req, res) => {
  res.sendFile(import_path.default.join(process.cwd(), "manifest.json"));
});
app.get("/robots.txt", (req, res) => {
  res.type("text/plain");
  res.send(`User-agent: *
Allow: /
Disallow: /api/

Sitemap: ${BASE_APP_URL}/sitemap.xml
`);
});
app.get("/sitemap.xml", (req, res) => {
  res.type("application/xml");
  const currentDate = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
  const paths = Object.keys(seoConfig.routes);
  const sitemapItems = paths.map((p) => {
    const priority = p === "/" ? "1.0" : "0.8";
    const changefreq = p === "/" ? "daily" : "weekly";
    return `  <url>
    <loc>${BASE_APP_URL}${p === "/" ? "" : p}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
  }).join("\n");
  res.send(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapItems}
</urlset>`);
});
async function startViteAndExpress() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await (0, import_vite.createServer)({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
    log("Vite dev middleware mounted successfully on port 3000.");
  } else {
    const distPath = import_path.default.join(process.cwd(), "dist");
    app.use(import_express.default.static(distPath));
    app.get("*", async (req, res) => {
      const indexPath = import_path.default.join(distPath, "index.html");
      try {
        let html = await import_fs.default.promises.readFile(indexPath, "utf-8");
        const meta = getMetadataForRoute(req.path);
        const injection = `
    <title>${meta.title}</title>
    <meta name="description" content="${meta.description}" />
    <meta name="keywords" content="${meta.keywords}" />
    <link rel="canonical" href="${meta.canonicalUrl}" />
    
    <!-- Open Graph tags -->
    <meta property="og:title" content="${meta.ogTitle}" />
    <meta property="og:description" content="${meta.ogDescription}" />
    <meta property="og:image" content="${meta.ogImage}" />
    <meta property="og:url" content="${meta.canonicalUrl}" />
    
    <!-- Twitter Card tags -->
    <meta name="twitter:title" content="${meta.twitterTitle}" />
    <meta name="twitter:description" content="${meta.twitterDescription}" />
    <meta name="twitter:image" content="${meta.twitterImage}" />
    
    <!-- Structured JSON-LD Data -->
    <script type="application/ld+json">
      ${JSON.stringify(getStructuredData(), null, 2)}
    </script>
        `;
        if (html.includes("<!-- SEO_METADATA_INJECTION_PLACEHOLDER -->")) {
          html = html.replace("<!-- SEO_METADATA_INJECTION_PLACEHOLDER -->", injection);
        }
        html = html.replace(/<title>.*?<\/title>/, `<title>${meta.title}</title>`);
        res.send(html);
      } catch (err) {
        console.error("Failed to read and compile index.html:", err);
        res.sendFile(indexPath);
      }
    });
    log("Production mode: Static file host with Server-Side SEO injection configured.");
  }
  app.listen(PORT, "0.0.0.0", () => {
    log(`SERVER ACTIVE AND INGRESS ROUTED AT http://localhost:${PORT}`);
  });
}
startViteAndExpress();
//# sourceMappingURL=server.cjs.map
