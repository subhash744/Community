"use client"

import { useEffect, useState, useRef } from "react"
import { getAllUsers, getCurrentUser } from "@/lib/storage"
import { useRouter } from "next/navigation"
import Navigation from "@/components/navigation"

export default function HallOfFamePage() {
  const router = useRouter()
  const [users, setUsers] = useState<any[]>([])
  const [mounted, setMounted] = useState(false)
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedProfile, setSelectedProfile] = useState<any>(null)
  const [isMoving, setIsMoving] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
    const allUsers = getAllUsers()
    const user = getCurrentUser()
    setCurrentUser(user)
    
    // Simulate loading animation
    setTimeout(() => {
      setUsers(allUsers)
      setIsLoading(false)
    }, 1500)
  }, [])

  const handleMyFrame = () => {
    if (!currentUser) return
    
    setIsMoving(true)
    setSelectedProfile(currentUser)
    
    // Simulate progressive loading animation
    setTimeout(() => {
      setIsMoving(false)
    }, 2000)
  }

  if (!mounted) return null

  return (
    <div className="w-full min-h-screen bg-[#F7F5F3] overflow-hidden">
      <Navigation />

      <div className="px-6 py-12">
        <div className="max-w-7xl mx-auto mb-12 text-center">
          <h1 className="text-5xl font-serif text-[#37322F] mb-4">Hall of Fame</h1>
          <p className="text-lg text-[#605A57]">Discover the builders shaping the future</p>
        </div>

        {/* My Frame Button */}
        {currentUser && (
          <div className="flex justify-center mb-8">
            <button
              onClick={handleMyFrame}
              disabled={isMoving}
              className={`px-6 py-3 bg-[#37322F] text-white rounded-lg font-medium transition-all ${
                isMoving 
                  ? "opacity-50 cursor-not-allowed" 
                  : "hover:bg-[#2a2520] hover:scale-105"
              }`}
            >
              {isMoving ? "Moving to your frame..." : "My Frame"}
            </button>
          </div>
        )}

        {/* Open World Grid */}
        <div 
          ref={containerRef}
          className="max-w-7xl mx-auto relative"
          style={{ 
            height: "70vh",
            overflow: "auto",
            scrollBehavior: "smooth"
          }}
        >
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#37322F] mx-auto mb-4"></div>
                <p className="text-[#605A57]">Loading profiles...</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 p-4">
              {/* Empty slots for open world feel */}
              {Array.from({ length: 20 }, (_, i) => (
                <div
                  key={`empty-${i}`}
                  className="aspect-square bg-gradient-to-br from-[#E0DEDB] to-[#D0CECC] rounded-lg border-2 border-dashed border-[#C0BEB8] flex items-center justify-center opacity-50"
                >
                  <div className="text-center">
                    <div className="text-2xl mb-2">🏗️</div>
                    <p className="text-xs text-[#605A57]">Join the OG</p>
                    <p className="text-xs text-[#605A57]">Builders</p>
                  </div>
                </div>
              ))}

              {/* User profiles */}
              {users.map((user, index) => (
                <div
                  key={user.id}
                  onClick={() => router.push(`/profile/${user.id}`)}
                  className={`group cursor-pointer transform transition-all duration-500 hover:scale-110 ${
                    selectedProfile?.id === user.id ? "ring-4 ring-[#37322F] scale-110" : ""
                  } ${isMoving && selectedProfile?.id === user.id ? "animate-pulse" : ""}`}
                  style={{
                    animationDelay: `${index * 100}ms`
                  }}
                >
                  {/* Frame */}
                  <div className="bg-white border-4 border-[#37322F] p-3 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300">
                    {/* Avatar */}
                    <div className="w-full aspect-square bg-gradient-to-br from-[#E0DEDB] to-[#D0CECC] rounded-lg flex items-center justify-center mb-3 overflow-hidden">
                      <div className="text-3xl font-semibold text-[#37322F]">{user.displayName.charAt(0)}</div>
                    </div>

                    {/* Info - Always visible and centered */}
                    <div className="text-center">
                      <h3 className="font-semibold text-[#37322F] text-xs mb-1 truncate">{user.displayName}</h3>
                      <p className="text-xs text-[#605A57] mb-2 line-clamp-2">{user.bio}</p>

                      {/* Stats */}
                      <div className="flex gap-1 text-xs text-[#605A57] justify-center">
                        <span>{user.views}</span>
                        <span>👁️</span>
                        <span>{user.upvotes}</span>
                        <span>❤️</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* More empty slots */}
              {Array.from({ length: 15 }, (_, i) => (
                <div
                  key={`empty-bottom-${i}`}
                  className="aspect-square bg-gradient-to-br from-[#E0DEDB] to-[#D0CECC] rounded-lg border-2 border-dashed border-[#C0BEB8] flex items-center justify-center opacity-50"
                >
                  <div className="text-center">
                    <div className="text-2xl mb-2">🚀</div>
                    <p className="text-xs text-[#605A57]">Future</p>
                    <p className="text-xs text-[#605A57]">Builder</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Join Community CTA */}
        {!currentUser && (
          <div className="text-center mt-12">
            <div className="bg-white border-4 border-[#37322F] rounded-lg p-8 max-w-md mx-auto">
              <h3 className="text-xl font-semibold text-[#37322F] mb-4">Join the OG Builders Community</h3>
              <p className="text-[#605A57] mb-6">Be part of the future. Create your profile and get your frame in the Hall of Fame.</p>
              <button
                onClick={() => router.push("/profile-creation")}
                className="px-6 py-3 bg-[#37322F] text-white rounded-lg font-medium hover:bg-[#2a2520] transition"
              >
                Get Your Frame
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}