import ToolDirectory from '@/components/ToolDirectory'
import AdBanner from '@/components/AdBanner'

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              AI Tool Marketplace
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover, share, and deploy cutting-edge AI tools. Our mission is to democratize access to artificial intelligence by creating a collaborative platform where developers and users can find, evaluate, and deploy the best AI solutions.
            </p>
          </div>
        </div>
      </header>

      {/* Mission Statement */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-primary-50 rounded-lg p-8">
            <h2 className="text-2xl font-semibold text-primary-700 mb-4">
              Our Mission
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              We believe in making artificial intelligence accessible to everyone. 
              Our marketplace connects innovative AI developers with users who need 
              powerful solutions, fostering a community-driven ecosystem where the 
              best tools rise to the top through real user feedback and ratings.
            </p>
          </div>
        </div>
      </section>

      {/* Ad Banner */}
      <AdBanner />

      {/* Tool Directory */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Featured AI Tools
          </h2>
          <ToolDirectory />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-4">AI Tool Marketplace</h3>
            <p className="text-gray-400">
              Empowering innovation through accessible AI solutions.
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
}
