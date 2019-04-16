using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity.UI.Services;
using SendGrid;
using SendGrid.Helpers.Mail;

namespace Blinq.Services
{
    public class EmailSender : IEmailSender
    {
        private string sendGridKey = "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";
        public EmailSender()
        {

        }

        public Task SendEmailAsync(string email, string subject, string message)
        {
            return Execute(sendGridKey, subject, message, email);
        }

        public Task Execute(string apiKey, string subject, string message, string email)
        {
            var client = new SendGridClient(apiKey);
            var msg = new SendGridMessage()
            {
                From = new EmailAddress("blinq@blinq.com", "Blinq Blinq"),
                Subject = subject,
                PlainTextContent = message,
                HtmlContent = message
            };
            msg.AddTo(new EmailAddress(email));
            msg.SetClickTracking(false, false);
            return client.SendEmailAsync(msg);
        }
    }
}