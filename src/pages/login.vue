<script setup lang="ts">
import { useGoogleAuth } from '~/composables/useGoogleAuth';
import { useRouter } from 'vue-router';
import LoadingIndicator from '~/components/LoadingIndicator.vue';

useHead({
  title: 'Login - Mini Dragon Battle',
  meta: [
    { name: 'description', content: 'Login to start your dragon battle adventure' }
  ]
})

const router = useRouter();
const loading = useLoadingStore();
const { loginWithGoogle } = useGoogleAuth();

const handleLogin = async () => {
  loading.startLoading();
  try {
    await loginWithGoogle();
    await router.push({ name: 'play' });
  } catch (error) {
    console.error(error);
  } finally {
    loading.stopLoading();
  }
};

const config = useRuntimeConfig();
const isDevelopment = config.public.FIREBASE_API_KEY === 'dummy-api-key-for-development';

const handleBack = () => {
  router.push('/');
};

const handleSkipAuth = () => {
  router.push({ name: 'play' });
};
</script>

<template>
  <div class="login-container">
    <div class="login-stars-bg"></div>
    
    <LoadingIndicator :show="loading.isLoading" />

    <div class="login-card">
      <div class="login-header">
        <div class="pixel-frame">
          <h1 class="login-title">
            <span class="title-part">DRAGON</span>
            <span class="title-part access">ACCESS</span>
          </h1>
        </div>
        
        <div class="login-subtitle">
          <p class="access-text">~ AUTHENTICATION REQUIRED ~</p>
        </div>
      </div>

      <div class="login-content">
        <div class="terminal-window">
          <div class="terminal-header">
            <div class="terminal-buttons">
              <span class="terminal-btn red"></span>
              <span class="terminal-btn yellow"></span>
              <span class="terminal-btn green"></span>
            </div>
            <span class="terminal-title">DRAGON_AUTH.EXE</span>
          </div>
          
          <div class="terminal-body">
            <div class="terminal-text">
              <p class="terminal-line">
                <span class="prompt">></span> Initializing Dragon Battle System...
              </p>
              <p class="terminal-line">
                <span class="prompt">></span> Checking security protocols...
              </p>
              <p class="terminal-line success">
                <span class="prompt">></span> Ready for authentication
              </p>
              <p class="terminal-line input-line">
                <span class="prompt">></span> Please authenticate to continue
                <span class="cursor">_</span>
              </p>
            </div>
          </div>
        </div>

        <div class="auth-section">
          <button
            v-if="!isDevelopment"
            class="btn-auth"
            :disabled="loading.isLoading"
            @click="handleLogin"
          >
            <div class="btn-auth-content">
              <div class="google-icon">G</div>
              <span class="btn-auth-text">GOOGLE AUTHENTICATION</span>
            </div>
          </button>

          <button
            v-if="isDevelopment"
            class="btn-auth dev"
            @click="handleSkipAuth"
          >
            <div class="btn-auth-content">
              <div class="dev-icon">DEV</div>
              <span class="btn-auth-text">SKIP AUTHENTICATION (DEV)</span>
            </div>
          </button>

          <div class="auth-info">
            <p v-if="!isDevelopment" class="info-text">Secure login powered by Google OAuth</p>
            <p v-if="isDevelopment" class="info-text dev-text">Development mode - Authentication disabled</p>
          </div>
        </div>
      </div>

      <div class="login-footer">
        <button class="btn-back" @click="handleBack">
          <span class="back-arrow">←</span>
          <span class="back-text">BACK TO MAIN</span>
        </button>
        
        <div class="login-divider"></div>
        <p class="footer-hint">Your progress will be saved to the cloud</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  position: relative;
  overflow: hidden;
  font-family: 'Courier New', monospace;
}

.login-stars-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    radial-gradient(1px 1px at 25px 25px, #fff, transparent),
    radial-gradient(1px 1px at 75px 75px, rgba(255,255,255,0.6), transparent),
    radial-gradient(2px 2px at 125px 25px, #fff, transparent),
    radial-gradient(1px 1px at 175px 125px, rgba(255,255,255,0.8), transparent);
  background-repeat: repeat;
  background-size: 200px 150px;
  animation: twinkle-slow 4s ease-in-out infinite alternate;
}

@keyframes twinkle-slow {
  0% { opacity: 0.4; }
  100% { opacity: 0.8; }
}

.login-card {
  background: rgba(26, 26, 46, 0.95);
  border: 3px solid #00ffff;
  border-radius: 0;
  padding: 2rem;
  max-width: 500px;
  width: 100%;
  position: relative;
  box-shadow: 
    0 0 30px rgba(0, 255, 255, 0.2),
    inset 0 0 30px rgba(0, 255, 255, 0.05);
  backdrop-filter: blur(10px);
}

.login-card::before {
  content: '';
  position: absolute;
  top: -6px;
  left: -6px;
  right: -6px;
  bottom: -6px;
  border: 2px solid #ff00ff;
  z-index: -1;
}

.login-header {
  text-align: center;
  margin-bottom: 2rem;
}

.pixel-frame {
  border: 2px solid #00ffff;
  padding: 1rem;
  background: rgba(0, 255, 255, 0.05);
  margin-bottom: 1rem;
}

.login-title {
  font-size: 2.2rem;
  font-weight: bold;
  color: #00ffff;
  text-shadow: 
    2px 2px 0px #ff00ff,
    3px 3px 0px #000;
  line-height: 1;
  letter-spacing: 0.1em;
}

.title-part {
  display: block;
}

.access {
  color: #ff00ff;
  text-shadow: 
    2px 2px 0px #00ffff,
    3px 3px 0px #000;
}

.access-text {
  color: #ffff00;
  font-size: 1rem;
  letter-spacing: 0.2em;
  text-shadow: 1px 1px 0px #000;
  animation: glow-pulse 2s ease-in-out infinite alternate;
}

@keyframes glow-pulse {
  from { opacity: 0.8; }
  to { opacity: 1; text-shadow: 1px 1px 0px #000, 0 0 10px #ffff00; }
}

.login-content {
  margin-bottom: 2rem;
}

.terminal-window {
  background: #000;
  border: 2px solid #333;
  border-radius: 0;
  margin-bottom: 1.5rem;
  overflow: hidden;
}

.terminal-header {
  background: #333;
  padding: 0.5rem 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  border-bottom: 1px solid #666;
}

.terminal-buttons {
  display: flex;
  gap: 0.3rem;
}

.terminal-btn {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.red { background: #ff5f56; }
.yellow { background: #ffbd2e; }
.green { background: #27ca3f; }

.terminal-title {
  color: #ccc;
  font-size: 0.8rem;
  font-weight: bold;
}

.terminal-body {
  padding: 1rem;
  min-height: 120px;
}

.terminal-text {
  color: #00ff00;
  font-size: 0.9rem;
  line-height: 1.6;
}

.terminal-line {
  margin-bottom: 0.3rem;
}

.prompt {
  color: #00ffff;
  font-weight: bold;
}

.success {
  color: #00ff00;
}

.input-line {
  color: #ffff00;
}

.cursor {
  animation: cursor-blink 1s infinite;
}

@keyframes cursor-blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

.auth-section {
  text-align: center;
}

.btn-auth {
  background: linear-gradient(145deg, #1a1a2e, #16213e);
  border: 3px solid #00ffff;
  color: #00ffff;
  padding: 1rem 1.5rem;
  width: 100%;
  cursor: pointer;
  position: relative;
  transition: all 0.3s ease;
  font-family: 'Courier New', monospace;
  font-weight: bold;
  box-shadow: 
    0 4px 0 #004444,
    0 8px 20px rgba(0, 0, 0, 0.3);
}

.btn-auth:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 
    0 6px 0 #004444,
    0 12px 25px rgba(0, 0, 0, 0.4),
    0 0 15px rgba(0, 255, 255, 0.3);
}

.btn-auth:active:not(:disabled) {
  transform: translateY(2px);
  box-shadow: 
    0 2px 0 #004444,
    0 4px 10px rgba(0, 0, 0, 0.2);
}

.btn-auth:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-auth-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.google-icon {
  width: 24px;
  height: 24px;
  background: #fff;
  color: #4285f4;
  border-radius: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1rem;
}

.btn-auth-text {
  letter-spacing: 0.1em;
}

.auth-info {
  margin-top: 1rem;
}

.info-text {
  color: #888;
  font-size: 0.8rem;
  letter-spacing: 0.05em;
}

.btn-auth.dev {
  border-color: #ffff00;
  color: #ffff00;
  box-shadow: 
    0 4px 0 #666600,
    0 8px 20px rgba(0, 0, 0, 0.3);
}

.btn-auth.dev:hover {
  box-shadow: 
    0 6px 0 #666600,
    0 12px 25px rgba(0, 0, 0, 0.4),
    0 0 15px rgba(255, 255, 0, 0.3);
}

.btn-auth.dev:active {
  box-shadow: 
    0 2px 0 #666600,
    0 4px 10px rgba(0, 0, 0, 0.2);
}

.dev-icon {
  width: 24px;
  height: 24px;
  background: #ffff00;
  color: #000;
  border-radius: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 0.7rem;
}

.dev-text {
  color: #ffff00;
}

.login-footer {
  text-align: center;
  border-top: 1px solid #333;
  padding-top: 1.5rem;
}

.btn-back {
  background: transparent;
  border: 2px solid #ff00ff;
  color: #ff00ff;
  padding: 0.7rem 1.2rem;
  cursor: pointer;
  font-family: 'Courier New', monospace;
  font-weight: bold;
  font-size: 0.9rem;
  letter-spacing: 0.1em;
  transition: all 0.3s ease;
  margin-bottom: 1rem;
}

.btn-back:hover {
  background: rgba(255, 0, 255, 0.1);
  box-shadow: 0 0 10px rgba(255, 0, 255, 0.3);
}

.back-arrow {
  margin-right: 0.5rem;
}

.login-divider {
  width: 150px;
  height: 1px;
  background: linear-gradient(90deg, transparent, #666, transparent);
  margin: 0 auto 1rem;
}

.footer-hint {
  color: #666;
  font-size: 0.8rem;
  letter-spacing: 0.05em;
}

@media (max-width: 768px) {
  .login-container {
    padding: 1rem;
  }
  
  .login-card {
    padding: 1.5rem;
  }
  
  .login-title {
    font-size: 1.8rem;
  }
  
  .btn-auth-content {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .btn-auth-text {
    font-size: 0.9rem;
  }
}
</style>
