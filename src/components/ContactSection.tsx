import Section from "../layout/Section";

const ContactSection = () => {
    const handleSubmit = (e: FormDataEvent) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        // Basic form submission alert, can be replaced with actual API call
        alert(`Message sent (simulated): \nName: ${name}\nEmail: ${email}\nMessage: ${message}`);
    };

    return (
        <Section id="contact">
            <div class="container mx-auto px-6">
                <h2 class="text-3xl font-bold mb-12 text-center text-white">
                    <span class="text-gray-500">// </span>Get In Touch
                </h2>
                <div class="max-w-4xl mx-auto">
                    <div class="grid md:grid-cols-2 gap-8">
                        <div class="card p-8 rounded-lg">
                            <h3 class="text-xl font-semibold mb-6 text-green-400">Let's Connect</h3>
                            <p class="text-gray-300 mb-6">
                                I'm always interested in new opportunities and exciting projects.
                                Whether you want to discuss a potential collaboration or just say hello,
                                feel free to reach out!
                            </p>
                            <div class="space-y-4">
                                <div class="flex items-center">
                                    <i class="fas fa-envelope text-green-400 w-6 text-center"></i>
                                    <a href="mailto:jessen_1206@yahoo.com" class="text-gray-300 hover:text-green-400 transition-colors ml-3">
                                        jessen_1206@yahoo.com
                                    </a>
                                </div>
                                <div class="flex items-start">
                                    <i class="fas fa-map-marker-alt text-green-400 w-6 text-center pt-1"></i>
                                    <span class="text-gray-300 ml-3">
                                        Bintaro Jaya Sektor IX<br />
                                        Tangerang Selatan, Banten
                                    </span>
                                </div>
                            </div>
                        </div>
                        <form onSubmit={handleSubmit} class="card p-8 rounded-lg">
                            <h3 class="text-xl font-semibold mb-6 text-green-400">Quick Message</h3>
                            <div class="space-y-4">
                                <div>
                                    <label htmlFor="name" class="block text-gray-400 text-sm mb-2">Name</label>
                                    <input
                                        type="text" id="name" name="name"
                                        class="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white focus:border-green-400 focus:outline-none transition-colors"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" class="block text-gray-400 text-sm mb-2">Email</label>
                                    <input
                                        type="email" id="email" name="email"
                                        class="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white focus:border-green-400 focus:outline-none transition-colors"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="message" class="block text-gray-400 text-sm mb-2">Message</label>
                                    <textarea
                                        id="message" name="message" rows={4}
                                        class="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white focus:border-green-400 focus:outline-none transition-colors"
                                        required
                                    ></textarea>
                                </div>
                                <button type="submit" class="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded transition-colors glow">
                                    <i class="fas fa-paper-plane mr-2"></i>Send Message
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div >
        </Section >
    );
};

export default ContactSection;
