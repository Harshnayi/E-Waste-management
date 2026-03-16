import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  {
    question: "How is E-Waste toxicity measured?",
    answer: "E-waste toxicity is measured through standardized tests that assess the concentration of hazardous materials like lead, mercury, and cadmium. Our facilities use EPA-approved testing methods to categorize waste by risk level and determine appropriate handling procedures.",
  },
  {
    question: "Can I trade credits for physical products?",
    answer: "Yes! Carbon credits can be redeemed for a variety of rewards including eco-friendly products, gift cards, tree planting initiatives, and discounts on future recycling services. Check the Rewards dashboard for current redemption options.",
  },
  {
    question: "What certifications do your facilities hold?",
    answer: "All our partner facilities are ISO 14001 certified for environmental management, R2 certified for responsible recycling, and e-Stewards certified for ethical e-waste handling. We also maintain EPA compliance across all operations.",
  },
];

export const FAQSection = () => {
  return (
    <section className="py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground text-center mb-10">
          Frequently Asked Questions
        </h2>
        
        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`faq-${index}`}
              className="card-elevated rounded-xl px-5 border-0"
            >
              <AccordionTrigger className="text-left font-medium text-foreground hover:no-underline py-4">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-4">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};
