import { Request, Response } from 'express'
import { exec } from 'child_process'
import { promisify } from 'util'

const execAsync = promisify(exec)

export async function resetDemo(req: Request, res: Response) {
  if (process.env.NODE_ENV !== 'demo') {
    return res.status(403).json({ 
      success: false, 
      error: 'This endpoint is only available in demo environment' 
    })
  }

  try {
    console.log('🚀 Starting demo reset via API...')
    
    const { stdout, stderr } = await execAsync('cross-env NODE_ENV=demo yarn demo:reset', {
      env: { ...process.env, RESET_TOKEN: process.env.DEMO_RESET_TOKEN }
    })
    
    if (stderr) console.error('Reset stderr:', stderr)
    
    console.log('✅ Demo reset successful')
    res.status(200).json({ 
      success: true, 
      message: 'Demo environment reset successfully',
      timestamp: new Date().toISOString()
    })
  } catch (error: any) {
    console.error(`[ADMIN - RESET DEMO] ${error}`)
    
    res.status(500).json({ 
      success: false, 
      error: 'Failed to reset demo environment',
      details: process.env.NODE_ENV === 'demo' ? error.message : undefined
    })
  }
}
