import { Globe, CheckCircle, XCircle, Ticket } from "lucide-react"

export default function UserDashboard({ users, setUsers, currentUser, setView }) {
  const user = users.find(u => u.id === currentUser.id)

  const apply = (destination) => {
    setUsers(users.map(u =>
      u.id === user.id ? { ...u, destination, status: "Pending" } : u
    ))
  }

  const statusBadge = () => {
    if (user.status === "New") {
      return (
        <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 font-bold text-sm">
          NEW
        </span>
      )
    }
    if (user.status === "Pending") {
      return (
        <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 font-bold text-sm">
          PENDING
        </span>
      )
    }
    if (user.status === "Won") {
      return (
        <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 font-bold text-sm">
          WON
        </span>
      )
    }
    return (
      <span className="px-3 py-1 rounded-full bg-red-100 text-red-700 font-bold text-sm">
        REJECTED
      </span>
    )
  }

  const progress = user.status === "New" ? 20 : user.status === "Pending" ? 60 : user.status === "Won" ? 100 : 40

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      <div className="max-w-5xl mx-auto p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">Juman Travel Promo</h1>
            <p className="text-slate-300 mt-1">
              Enter for a chance to win a trip to <span className="text-blue-200">Canada</span> or the <span className="text-blue-200">UK</span>
            </p>
          </div>

          <button
            onClick={() => setView("login")}
            className="flex items-center gap-2 bg-white text-slate-900 px-4 py-2 rounded-lg font-bold"
          >
            <XCircle size={18} />
            Logout
          </button>
        </div>

        {/* Progress */}
        <div className="bg-slate-900/60 border border-slate-700 rounded-xl p-5 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="font-bold text-lg">Application Progress</h2>
              <p className="text-slate-300 mt-1">
                Your journey to travel abroad starts here.
              </p>
            </div>
            <div className="font-bold">{progress}%</div>
          </div>
          <div className="bg-slate-800 rounded-full h-3 mt-4">
            <div
              className="bg-blue-500 h-3 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-slate-900/60 border border-slate-700 rounded-xl p-5">
            <h2 className="font-bold text-lg">Your Details</h2>
            <p className="text-slate-300 mt-2">
              <span className="font-semibold">Phone:</span> {user.phone}
            </p>
            <p className="text-slate-300 mt-1">
              <span className="font-semibold">Status:</span> {statusBadge()}
            </p>
          </div>

          <div className="bg-slate-900/60 border border-slate-700 rounded-xl p-5">
            <h2 className="font-bold text-lg">Your Entry</h2>
            <p className="text-slate-300 mt-2">
              {user.destination ? (
                <>
                  <span className="font-semibold">Destination:</span> {user.destination}
                </>
              ) : (
                "You have not applied yet."
              )}
            </p>
            <p className="text-slate-300 mt-1">
              <span className="font-semibold">Chance:</span> <span className="text-blue-200">85% Canada / 15% UK</span>
            </p>
          </div>

          <div className="bg-slate-900/60 border border-slate-700 rounded-xl p-5">
            <h2 className="font-bold text-lg">How It Works</h2>
            <ul className="text-slate-300 mt-2 space-y-2">
              <li className="flex items-center gap-2">
                <CheckCircle size={18} className="text-green-400" />
                Register with phone & PIN
              </li>
              <li className="flex items-center gap-2">
                <Ticket size={18} className="text-yellow-400" />
                Apply for Canada or UK
              </li>
              <li className="flex items-center gap-2">
                <Globe size={18} className="text-blue-400" />
                Admin draws winner
              </li>
            </ul>
          </div>
        </div>

        {/* Apply Section */}
        {!user.destination && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white/10 border border-slate-700 rounded-xl p-6 text-center">
              <h3 className="font-bold text-xl">Apply for Canada</h3>
              <p className="text-slate-300 mt-2">Toronto, Vancouver, or Montreal</p>
              <button
                onClick={() => apply("Canada")}
                className="mt-4 bg-red-600 px-6 py-2 rounded-lg font-bold"
              >
                Apply Now
              </button>
            </div>

            <div className="bg-white/10 border border-slate-700 rounded-xl p-6 text-center">
              <h3 className="font-bold text-xl">Apply for UK</h3>
              <p className="text-slate-300 mt-2">London, Manchester, or Edinburgh</p>
              <button
                onClick={() => apply("UK")}
                className="mt-4 bg-blue-600 px-6 py-2 rounded-lg font-bold"
              >
                Apply Now
              </button>
            </div>
          </div>
        )}

        {/* Winner Message */}
        {user.status === "Won" && (
          <div className="mt-8 bg-green-900/50 border border-green-500 rounded-xl p-6">
            <h2 className="font-bold text-2xl">Congratulations!</h2>
            <p className="mt-2 text-slate-200">
              You have won a trip to <span className="text-green-200">{user.destination}</span>!
            </p>
          </div>
        )}

        {/* Pending Message */}
        {user.status === "Pending" && (
          <div className="mt-8 bg-blue-900/50 border border-blue-500 rounded-xl p-6">
            <h2 className="font-bold text-2xl">Application Submitted</h2>
            <p className="mt-2 text-slate-200">
              Your entry is being reviewed. The admin will draw winners soon.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
