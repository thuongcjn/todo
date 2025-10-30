import React from 'react'

const Footer = ({completeTaskCount = 0, activeTaskCount = 0}) => {
  return (
    <>
      {completeTaskCount + activeTaskCount > 0 &&(
        <div className='text-center'>
            <p className="text-sm text-muted-foreground">
                {
                  completeTaskCount > 0 && (
                    <>
                      Great! You have completed {completeTaskCount} tasks. 
                      {
                        activeTaskCount > 0 && ` Only ${activeTaskCount} tasks left, keep it up`
                      }
                    </>
                  )
                }

                {
                  completeTaskCount ===0 && activeTaskCount >0 && (
                    <>
                      Let's start doing {activeTaskCount} tasks
                    </>
                  )
                }


            </p>
        </div>
      )}
    
    </>
  )
}

export default Footer