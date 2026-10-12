'use client';

import { useEffect } from 'react';
import Clarity from '@microsoft/clarity';

export function ClarityInit() {
  useEffect(() => {
    Clarity.init('ywp24w0o9e');
  }, []);

  return null;
}
