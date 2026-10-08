<template>
  <div class="ai-tools-container">
    <div class="ai-tools-grid">
      <div 
        v-for="tool in aiToolsData" 
        :key="tool.id" 
        class="ai-tool-card"
      >
        <!-- 卡片头部：图标 Badge + 工具名称与厂商 -->
        <div class="card-header">
          <div class="badge-icon">
            {{ tool.badge }}
          </div>
          <div class="header-info">
            <h3 class="tool-name" :title="tool.name">{{ tool.name }}</h3>
            <span class="company-name" :title="tool.company">{{ tool.company }}</span>
          </div>
        </div>

        <!-- 卡片中部：一句话定位描述 -->
        <p class="tool-desc" :title="tool.desc">
          {{ tool.desc }}
        </p>

        <!-- 卡片底部：操作按钮栏 -->
        <div class="card-actions">
          <a 
            :href="tool.websiteUrl" 
            target="_blank" 
            rel="noopener noreferrer" 
            class="action-btn website-btn"
          >
            <span>官网</span>
            <svg class="external-icon" viewBox="0 0 12 12" width="12" height="12">
              <path d="M6 1h5v5M11 1L5 7" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </a>
          <a 
            :href="tool.topicUrl" 
            class="action-link topic-link"
          >
            查看专题 →
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { aiToolsData } from '../../../data/ai-tools'
</script>

<style scoped>
.ai-tools-container {
  margin: 2rem 0 3.5rem 0;
  width: 100%;
}

/* 优化后布局：桌面端改为 3 列，赋予充足宽裕空间与呼吸感 */
.ai-tools-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.25rem;
}

/* 响应式适配 */
@media (max-width: 860px) {
  .ai-tools-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1rem;
  }
}

@media (max-width: 580px) {
  .ai-tools-grid {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
}

/* 极客高质感精致卡片 */
.ai-tool-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: var(--vp-c-bg-elv);
  border: 1px solid var(--vp-c-border);
  border-radius: 12px;
  padding: 1.25rem;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.02), 0 1px 2px rgba(0, 0, 0, 0.04);
  position: relative;
  overflow: hidden;
}

.dark .ai-tool-card {
  background-color: rgba(30, 30, 36, 0.85);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
}

.ai-tool-card:hover {
  transform: translateY(-4px);
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 12px 24px -6px rgba(37, 99, 235, 0.16) !important;
}

/* 头部样式 */
.card-header {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  margin-bottom: 0.85rem;
}

.badge-icon {
  width: 44px;
  height: 44px;
  min-width: 44px;
  border-radius: 10px;
  background: linear-gradient(135deg, var(--vp-c-brand-soft) 0%, rgba(6, 182, 212, 0.12) 100%);
  color: var(--vp-c-brand-1);
  font-weight: 700;
  font-size: 0.88rem;
  display: flex;
  align-items: center;
  justify-content: center;
  letter-spacing: 0.5px;
  border: 1px solid rgba(37, 99, 235, 0.15);
}

.header-info {
  display: flex;
  flex-direction: column;
  min-width: 0;
  flex: 1;
}

.tool-name {
  margin: 0 !important;
  padding: 0 !important;
  font-size: 1.05rem !important;
  font-weight: 700 !important;
  color: var(--vp-c-text-1);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  border: none !important;
  line-height: 1.3 !important;
}

.company-name {
  font-size: 0.78rem;
  color: var(--vp-c-text-2);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-top: 2px;
}

/* 描述短文 */
.tool-desc {
  margin: 0 0 1.1rem 0 !important;
  font-size: 0.85rem;
  line-height: 1.5;
  color: var(--vp-c-text-2);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  min-height: 2.55em;
}

/* 底部按钮与链接 */
.card-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 0.85rem;
  border-top: 1px dashed var(--vp-c-border);
}

.action-btn {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 0.8rem;
  font-weight: 500;
  padding: 4px 12px;
  border-radius: 6px;
  background-color: var(--vp-c-bg-alt);
  color: var(--vp-c-text-1) !important;
  border: 1px solid var(--vp-c-border);
  text-decoration: none !important;
  white-space: nowrap;
  transition: all 0.2s ease;
}

.action-btn:hover {
  background-color: var(--vp-c-brand-1);
  color: #ffffff !important;
  border-color: var(--vp-c-brand-1);
}

.external-icon {
  display: inline-block;
  vertical-align: middle;
}

.action-link {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--vp-c-brand-1) !important;
  text-decoration: none !important;
  white-space: nowrap;
  transition: opacity 0.2s ease;
}

.action-link:hover {
  opacity: 0.8;
  text-decoration: underline !important;
}
</style>
