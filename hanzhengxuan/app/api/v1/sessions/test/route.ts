import { NextRequest, NextResponse } from 'next/server'
import { validateSessionId } from '@/lib/utils/session'

export async function GET(request: NextRequest) {
  const testCases = [
    '654c69a9-7edf-46f1-ab3b-281631607157', // Valid UUID
    'invalid-uuid-format',                   // Invalid format
    '654c69a9-7edf-46f1-ab3b',              // Too short
    'XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX'  // Wrong characters
  ]
  
  const results = testCases.map(id => ({
    id,
    isValid: validateSessionId(id)
  }))
  
  return NextResponse.json({
    success: true,
    test: 'UUID Validation',
    results
  })
}