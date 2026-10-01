export function whatsappLink(phone: string, message: string) {
  return `https://wa.me/${phone.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;
}
export function cn(...values: (string | undefined | false)[]) {
  return values.filter(Boolean).join(" ");
}
